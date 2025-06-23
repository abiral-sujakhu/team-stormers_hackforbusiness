"use client"
import { useEffect, useState, useRef } from "react"
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
} from "@/components/ui/dialog"
import { Stethoscope, Star, Phone, Calendar, Clock, User } from "lucide-react"
import { useSubscription } from "@/components/subscription-provider"
import { PremiumGuard } from "@/components/premium-guard"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Interfaces
interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  experience: number
  location: string
  phone: string
  email: string
  image: string
  bio: string
  specializations: string[]
  languages: string[]
  availability: string[]
  consultationFee: number
}
interface Appointment {
  id: number
  doctor_id: number
  doctor_name: string
  date: string
  time: string
  type: "consultation" | "checkup" | "ultrasound"
  status: "upcoming" | "completed" | "cancelled"
  notes?: string
}

// Example doctors (keep using this)
const mockDoctors: Doctor[] = [  {
    id: 1,
    name: "Dr. Sita Sharma",
    specialty: "Obstetrician & Gynecologist",
    rating: 4.9,
    experience: 12,
    location: "Kathmandu Maternity Center",
    phone: "9812345678",
    email: "dr.sita@kathmandumaternity.com",
    image: "/sita.jpeg",
    bio: "Dr. Sita Sharma specializes in high-risk pregnancies and is dedicated to providing compassionate care to mothers throughout Nepal.",
    specializations: ["High-risk pregnancies", "Prenatal care", "Natural birth", "C-sections"],
    languages: ["English", "Nepali"],
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    consultationFee: 400,
  },  {
    id: 2,
    name: "Dr. Ram Bahadur Thapa",
    specialty: "Maternal-Fetal Medicine",
    rating: 4.8,
    experience: 15,
    location: "Patan Hospital",
    phone: "9801122334",
    email: "dr.ram@patanhospital.com",
    image: "/ram.jpeg",
    bio: "Dr. Ram Bahadur Thapa is an expert in maternal-fetal medicine, helping families with complex pregnancies across Nepal.",
    specializations: ["Fetal diagnostics", "Genetic counseling", "Multiple pregnancies", "Fetal surgery"],
    languages: ["English", "Nepali"],
    availability: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    consultationFee: 250,
  },  {
    id: 3,
    name: "Dr. Mina Karki",
    specialty: "Certified Nurse Midwife",
    rating: 4.7,
    experience: 8,
    location: "Biratnagar Birth Center",
    phone: "9845671234",
    email: "dr.mina@biratnagarbirth.com",
    image: "/minaa.jpg",
    bio: "Dr. Mina Karki empowers women through natural childbirth and provides personalized care for families in the eastern region.",
    specializations: ["Natural birth", "Water birth", "Home birth", "Breastfeeding support"],
    languages: ["English", "Nepali"],
    availability: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationFee: 500,
  },  {
    id: 4,
    name: "Dr. Bishal Adhikari",
    specialty: "Perinatologist",
    rating: 4.9,
    experience: 18,
    location: "Pokhara Regional Hospital",
    phone: "9865432109",
    email: "dr.bishal@pokharahospital.com",
    image: "/male.jpg",
    bio: "Dr. Bishal Adhikari has extensive experience in managing high-risk pregnancies and complications in the western region.",
    specializations: ["High-risk pregnancies", "Preterm labor", "Pregnancy complications", "NICU coordination"],
    languages: ["English", "Nepali"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    consultationFee: 300,
  },
];

export default function DoctorsPage() {
  // State variables
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All specialties");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");  const [isBooking, setIsBooking] = useState(false);  const [dialogOpen, setDialogOpen] = useState(false);
  const bookingInProgress = useRef(false);
  const lastClickTime = useRef(0);
  const buttonClicked = useRef(false);
  const { isPremium, upgradeToPremium } = useSubscription();
  const { toast } = useToast();
  // Replace with your actual auth logic
  const userEmail = "demo@aahar.com";

  // Reset booking state
  const resetBookingState = () => {
    buttonClicked.current = false;
    bookingInProgress.current = false;
    setIsBooking(false);
    setBookingDate("");
    setBookingTime("");
    setBookingType("");
    setBookingNotes("");
  };

  // Handle dialog close
  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      resetBookingState();
    }
  };

  // Filter logic for doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All specialties" || doctor.specialty.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  // Fetch user's appointments from backend
  const fetchAppointments = async () => {
    if (!userEmail) return;
    const res = await fetch("/api/get-appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email: userEmail }),
    });
    const result = await res.json();
    if (result.success) setAppointments(result.appointments);
  };

  // Fetch appointments on mount
  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);  // Book appointment via backend and refresh list
  const handleBookAppointment = async (e?: React.MouseEvent) => {
    // Prevent form submission or event bubbling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const now = Date.now();
    
    // Stronger protection: check multiple conditions
    if (buttonClicked.current || isBooking || bookingInProgress.current) {
      console.log("Booking blocked - already in progress");
      return;
    }
      // Longer debounce: prevent clicks within 3 seconds
    if (now - lastClickTime.current < 3000) {
      console.log("Click ignored due to debounce - too fast!");
      return;
    }
    
    // Mark all flags immediately - BEFORE any async operations
    buttonClicked.current = true;
    bookingInProgress.current = true;
    setIsBooking(true);
    lastClickTime.current = now;
    
    // Disable the button immediately
    const button = e?.target as HTMLButtonElement;
    if (button) {
      button.disabled = true;
    }
    
    if (!selectedDoctor || !bookingDate || !bookingTime || !bookingType || !userEmail) {
      // Reset flags if validation fails
      buttonClicked.current = false;
      bookingInProgress.current = false;
      setIsBooking(false);
      if (button) {
        button.disabled = false;
      }
      
      console.log("Validation failed:", {
        selectedDoctor: !!selectedDoctor,
        bookingDate,
        bookingTime, 
        bookingType,
        userEmail
      });
      
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
      console.log("Starting booking process...");
    
    // Generate unique request ID to prevent duplicates
    const requestId = `${selectedDoctor.id}-${bookingDate}-${bookingTime}-${Date.now()}`;
    
    const requestData = {
      user_email: userEmail,
      doctor_id: selectedDoctor.id,
      doctor_name: selectedDoctor.name,
      date: bookingDate,
      time: bookingTime,
      type: bookingType,
      notes: bookingNotes,
      request_id: requestId, // Add unique identifier
    };
    
    console.log("Request data:", requestData);
    
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      
      console.log("Response status:", res.status);
      const result = await res.json();
      console.log("Response data:", result);

      if (result.success) {
        console.log("Booking successful");
        toast({
          title: "Appointment booked!",
          description: `Your appointment with ${selectedDoctor.name} has been scheduled.`,
        });
        
        // Close dialog and reset form
        setDialogOpen(false);
        setSelectedDoctor(null);
        resetBookingState();
        await fetchAppointments(); // Refresh after booking
      } else {
        console.log("Booking failed:", result.message);
        toast({
          title: "Booking failed",
          description: result.message || "Try again.",
          variant: "destructive",
        });
        
        // Reset flags on failure so user can try again
        buttonClicked.current = false;
        bookingInProgress.current = false;
        if (button) {
          button.disabled = false;
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Booking failed",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
      
      // Reset flags on error so user can try again
      buttonClicked.current = false;
      bookingInProgress.current = false;
      if (button) {
        button.disabled = false;
      }
    } finally {
      console.log("Booking process completed");
      setIsBooking(false);
      
      // Only reset these flags after a longer delay for successful bookings
      setTimeout(() => {
        buttonClicked.current = false;
        bookingInProgress.current = false;
        if (button) {
          button.disabled = false;
        }      }, 5000); // 5 second delay before allowing new bookings
    }
  };

  return (
    <PremiumGuard>
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
                        </div>
                        <Badge variant="secondary">{doctor.experience} years</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-semibold">Rs.{doctor.consultationFee}</span>
                      <span className="text-gray-500"> consultation</span>
                    </div>                    <div className="space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/doctors/${doctor.id}`}>
                          View Profile
                        </Link>
                      </Button>
                      <Button
                        size="sm"                        onClick={() => {                          setSelectedDoctor(doctor);
                          resetBookingState();
                          setDialogOpen(true);
                          buttonClicked.current = false; // Reset for new dialog session
                        }}
                      >
                        Book Appointment
                      </Button>
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
                        <span>{appointment.doctor_name}</span>
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
                    {appointment.status === "upcoming" && (
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setAppointments((prev) =>
                              prev.map((a) =>
                                a.id === appointment.id ? { ...a, status: "cancelled" } : a
                              )
                            )
                            toast({
                              title: "Appointment cancelled",
                              description: `Your appointment with ${appointment.doctor_name} has been cancelled.`,
                            })
                          }}
                        >
                          Cancel Appointment
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setAppointments((prev) => prev.filter((a) => a.id !== appointment.id))
                            toast({
                              title: "Appointment removed",
                              description: `This appointment has been removed from your list.`,
                            })
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    {["completed", "cancelled"].includes(appointment.status) && (
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setAppointments((prev) => prev.filter((a) => a.id !== appointment.id))
                            toast({
                              title: "Appointment removed",
                              description: `This appointment has been removed from your list.`,
                            })
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>      {/* Single Booking Dialog for all doctors */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-2xl">
          {selectedDoctor ? (
            <div>
              <DialogHeader>
                <DialogTitle>Book Appointment with {selectedDoctor.name}</DialogTitle>
                <DialogDescription>
                  Schedule your consultation with {selectedDoctor.specialty.toLowerCase()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Doctor Info */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedDoctor.image || "/placeholder.svg"}
                        alt={selectedDoctor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{selectedDoctor.name}</h4>
                        <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                        <p className="text-sm text-gray-600">{selectedDoctor.location}</p>
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
                    Consultation fee: <span className="font-semibold">Rs.{selectedDoctor.consultationFee}</span>
                  </div>                  <Button
                    type="button"
                    onClick={(e) => handleBookAppointment(e)}
                    disabled={isBooking || bookingInProgress.current}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBooking ? "Booking..." : "Confirm Booking"}                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
    </PremiumGuard>
  )
}
