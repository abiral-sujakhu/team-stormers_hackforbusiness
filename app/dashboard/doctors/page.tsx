"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Stethoscope, Star, MapPin, Phone, Calendar, Clock, User, Search } from "lucide-react"
import { useSubscription } from "@/components/subscription-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: number
  location: string
  distance: string
  phone: string
  email: string
  image: string
  bio: string
  specializations: string[]
  languages: string[]
  availability: string[]
  consultationFee: number
  acceptsInsurance: boolean
}

interface Appointment {
  id: number
  doctorId: number
  doctorName: string
  date: string
  time: string
  type: "consultation" | "checkup" | "ultrasound"
  status: "upcoming" | "completed" | "cancelled"
  notes?: string
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Obstetrician & Gynecologist",
    rating: 4.9,
    reviews: 127,
    experience: 12,
    location: "Women's Health Center",
    distance: "2.3 miles",
    phone: "(555) 123-4567",
    email: "dr.johnson@womenshealth.com",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Johnson specializes in high-risk pregnancies and has delivered over 2,000 babies. She is passionate about providing comprehensive prenatal care and supporting women through their pregnancy journey.",
    specializations: ["High-risk pregnancies", "Prenatal care", "Natural birth", "C-sections"],
    languages: ["English", "Spanish"],
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    consultationFee: 200,
    acceptsInsurance: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Maternal-Fetal Medicine",
    rating: 4.8,
    reviews: 89,
    experience: 15,
    location: "City Medical Center",
    distance: "3.7 miles",
    phone: "(555) 234-5678",
    email: "dr.chen@citymedical.com",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Chen is a specialist in maternal-fetal medicine with expertise in complex pregnancies and fetal diagnostics. He uses the latest technology to ensure the best outcomes for both mother and baby.",
    specializations: ["Fetal diagnostics", "Genetic counseling", "Multiple pregnancies", "Fetal surgery"],
    languages: ["English", "Mandarin"],
    availability: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    consultationFee: 250,
    acceptsInsurance: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Certified Nurse Midwife",
    rating: 4.7,
    reviews: 156,
    experience: 8,
    location: "Natural Birth Center",
    distance: "1.8 miles",
    phone: "(555) 345-6789",
    email: "dr.rodriguez@naturalbirth.com",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Rodriguez is a certified nurse midwife who believes in empowering women through natural childbirth. She provides personalized care and supports families in creating their ideal birth experience.",
    specializations: ["Natural birth", "Water birth", "Home birth", "Breastfeeding support"],
    languages: ["English", "Spanish", "Portuguese"],
    availability: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationFee: 150,
    acceptsInsurance: false,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Perinatologist",
    rating: 4.9,
    reviews: 203,
    experience: 18,
    location: "University Hospital",
    distance: "4.2 miles",
    phone: "(555) 456-7890",
    email: "dr.wilson@universityhospital.com",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Wilson is a perinatologist with extensive experience in managing high-risk pregnancies and complications. He works closely with a multidisciplinary team to provide the highest level of care.",
    specializations: ["High-risk pregnancies", "Preterm labor", "Pregnancy complications", "NICU coordination"],
    languages: ["English"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    consultationFee: 300,
    acceptsInsurance: true,
  },
]

const mockAppointments: Appointment[] = [
  {
    id: 1,
    doctorId: 1,
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "checkup",
    status: "upcoming",
    notes: "Regular prenatal checkup - 28 weeks",
  },
  {
    id: 2,
    doctorId: 2,
    doctorName: "Dr. Michael Chen",
    date: "2024-01-08",
    time: "2:30 PM",
    type: "ultrasound",
    status: "completed",
    notes: "Anatomy scan completed - everything looks great!",
  },
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All specialties")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingType, setBookingType] = useState("")
  const [bookingNotes, setBookingNotes] = useState("")
  const { isPremium, upgradeToPremium } = useSubscription()
  const { toast } = useToast()

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All specialties" || doctor.specialty.includes(selectedSpecialty)
    return matchesSearch && matchesSpecialty
  })

  const handleBookAppointment = () => {
    if (!selectedDoctor || !bookingDate || !bookingTime || !bookingType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: bookingDate,
      time: bookingTime,
      type: bookingType as "consultation" | "checkup" | "ultrasound",
      status: "upcoming",
      notes: bookingNotes,
    }

    setAppointments((prev) => [...prev, newAppointment])
    setBookingDate("")
    setBookingTime("")
    setBookingType("")
    setBookingNotes("")
    setSelectedDoctor(null)

    toast({
      title: "Appointment booked!",
      description: `Your appointment with ${selectedDoctor.name} has been scheduled.`,
    })
  }

  if (!isPremium) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doctor Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Find and book appointments with pregnancy specialists</p>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Upgrade to Premium to access our network of pregnancy specialists and book appointments directly through
              the app.
            </p>
            <Button
              onClick={() => {
                upgradeToPremium()
                toast({
                  title: "Welcome to Premium!",
                  description: "You now have access to doctor appointments and all premium features.",
                })
              }}
            >
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doctor Appointments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Find and book appointments with pregnancy specialists</p>
      </div>

      <Tabs defaultValue="find" className="space-y-4">
        <TabsList>
          <TabsTrigger value="find">Find Doctors</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments ({appointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Find Your Doctor</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="search">Search by name or specialty</Label>
                  <Input
                    id="search"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Filter by specialty</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All specialties">All specialties</SelectItem>
                      <SelectItem value="Obstetrician">Obstetrician & Gynecologist</SelectItem>
                      <SelectItem value="Maternal-Fetal">Maternal-Fetal Medicine</SelectItem>
                      <SelectItem value="Midwife">Certified Nurse Midwife</SelectItem>
                      <SelectItem value="Perinatologist">Perinatologist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialty}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                        </div>
                        <Badge variant="secondary">{doctor.experience} years</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{doctor.distance}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Specializations:</h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specializations.slice(0, 3).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {doctor.specializations.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{doctor.specializations.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-semibold">${doctor.consultationFee}</span>
                      <span className="text-gray-500"> consultation</span>
                    </div>
                    <div className="space-x-2">
                      <Link href={`/dashboard/doctors/${doctor.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedDoctor(doctor)}>
                            Book Appointment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                            <DialogDescription>
                              Schedule your consultation with {doctor.specialty.toLowerCase()}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            {/* Doctor Info */}
                            <Card>
                              <CardContent className="pt-6">
                                <div className="flex items-center space-x-4">
                                  <img
                                    src={doctor.image || "/placeholder.svg"}
                                    alt={doctor.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                  <div>
                                    <h4 className="font-semibold">{doctor.name}</h4>
                                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                    <p className="text-sm text-gray-600">{doctor.location}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Booking Form */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="date">Preferred Date</Label>
                                <Input
                                  id="date"
                                  type="date"
                                  value={bookingDate}
                                  onChange={(e) => setBookingDate(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="time">Preferred Time</Label>
                                <Select value={bookingTime} onValueChange={setBookingTime}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="type">Appointment Type</Label>
                              <Select value={bookingType} onValueChange={setBookingType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select appointment type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="consultation">Initial Consultation</SelectItem>
                                  <SelectItem value="checkup">Prenatal Checkup</SelectItem>
                                  <SelectItem value="ultrasound">Ultrasound</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Any specific concerns or questions you'd like to discuss..."
                                value={bookingNotes}
                                onChange={(e) => setBookingNotes(e.target.value)}
                              />
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                              <div className="text-sm text-gray-600">
                                Consultation fee: <span className="font-semibold">${doctor.consultationFee}</span>
                              </div>
                              <Button onClick={handleBookAppointment}>Confirm Booking</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          {appointments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No appointments yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Book your first appointment with one of our specialists.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>{appointment.doctorName}</span>
                      </CardTitle>
                      <Badge
                        variant={
                          appointment.status === "upcoming"
                            ? "default"
                            : appointment.status === "completed"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {appointment.type}
                        </Badge>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm">{appointment.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
