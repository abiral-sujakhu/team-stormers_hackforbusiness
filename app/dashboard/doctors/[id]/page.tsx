"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Users,
  MessageSquare,
  Heart,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useSubscription } from "@/components/subscription-provider"
import { useToast } from "@/hooks/use-toast"

// Mock doctor data - in real app this would come from API
const doctorData = {
  "1": {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Obstetrician & Gynecologist",
    rating: 4.9,
    reviews: 127,
    experience: 12,
    location: "Women's Health Center",
    address: "123 Medical Plaza, Suite 200, City, State 12345",
    phone: "(555) 123-4567",
    email: "dr.johnson@womenshealth.com",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Johnson specializes in high-risk pregnancies and has delivered over 2,000 babies. She is passionate about providing comprehensive prenatal care and supporting women through their pregnancy journey. She completed her residency at Johns Hopkins and has been practicing for over 12 years.",
    education: [
      "MD - Harvard Medical School (2008)",
      "Residency - Johns Hopkins Hospital (2012)",
      "Fellowship - Maternal-Fetal Medicine, UCLA (2014)",
    ],
    certifications: [
      "Board Certified in Obstetrics & Gynecology",
      "Maternal-Fetal Medicine Subspecialty",
      "Advanced Life Support in Obstetrics (ALSO)",
    ],
    specializations: ["High-risk pregnancies", "Prenatal care", "Natural birth", "C-sections", "Genetic counseling"],
    languages: ["English", "Spanish"],
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    consultationFee: 200,
    acceptsInsurance: true,
    insuranceAccepted: ["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealth"],
    hospitalAffiliations: ["City General Hospital", "Women's Medical Center", "Regional Medical Center"],
    awards: ["Top Doctor 2023 - City Magazine", "Excellence in Maternal Care Award 2022", "Patient Choice Award 2021"],
  },
}

interface Review {
  id: number
  patientName: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
}

const mockReviews: Review[] = [
  {
    id: 1,
    patientName: "Sarah M.",
    rating: 5,
    date: "2024-01-10",
    comment:
      "Dr. Johnson was amazing throughout my entire pregnancy. She was always available for questions and made me feel so comfortable. Highly recommend!",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    patientName: "Maria L.",
    rating: 5,
    date: "2024-01-05",
    comment:
      "Excellent care during my high-risk pregnancy. Dr. Johnson's expertise and compassion made all the difference. My baby and I are both healthy thanks to her.",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    patientName: "Jennifer K.",
    rating: 4,
    date: "2023-12-28",
    comment:
      "Very knowledgeable and professional. The only downside was sometimes having to wait a bit longer for appointments, but the quality of care made it worth it.",
    helpful: 5,
    verified: true,
  },
]

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.id as string
  const doctor = doctorData[doctorId as keyof typeof doctorData]
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(5)
  const { isPremium } = useSubscription()
  const { toast } = useToast()

  if (!doctor) {
    return <div>Doctor not found</div>
  }

  if (!isPremium) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doctor Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View detailed doctor information</p>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Upgrade to Premium to view detailed doctor profiles and book appointments.
            </p>
            <Button>Upgrade to Premium</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleReviewSubmit = () => {
    if (!newReview.trim()) return

    const review: Review = {
      id: Date.now(),
      patientName: "Anonymous User",
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      comment: newReview,
      helpful: 0,
      verified: false,
    }

    setReviews((prev) => [review, ...prev])
    setNewReview("")
    setNewRating(5)

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    })
  }

  return (
    <div className="space-y-6">
      {/* Doctor Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
              <AvatarFallback className="text-2xl">
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{doctor.name}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">{doctor.specialty}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-gray-500">({doctor.reviews} reviews)</span>
                </div>
                <Badge variant="secondary">{doctor.experience} years experience</Badge>
                <Badge variant="outline">Board Certified</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{doctor.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{doctor.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{doctor.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Available {doctor.availability.length} days/week</span>
                </div>
              </div>

              {/* Add click handlers for the main action buttons: */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <Button
                  onClick={() => {
                    toast({
                      title: "Booking appointment",
                      description: "Opening appointment booking form...",
                    })
                  }}
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Doctor saved",
                      description: `${doctor.name} has been saved to your favorites.`,
                    })
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Save Doctor
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Message sent",
                      description: "Your message has been sent to the doctor's office.",
                    })
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="about" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About Dr. {doctor.name.split(" ")[1]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Biography</h4>
                <p className="text-gray-700 dark:text-gray-300">{doctor.bio}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Education</h4>
                <div className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Certifications</h4>
                <div className="space-y-2">
                  {doctor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Hospital Affiliations</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.hospitalAffiliations.map((hospital, index) => (
                    <Badge key={index} variant="outline">
                      {hospital}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Awards & Recognition</h4>
                <div className="space-y-2">
                  {doctor.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specializations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Areas of Expertise</CardTitle>
              <CardDescription>Dr. {doctor.name.split(" ")[1]}'s specialized areas of practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {doctor.specializations.map((spec, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold">{spec}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Specialized care and treatment in {spec.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Languages Spoken</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {/* Review Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Reviews</CardTitle>
              <CardDescription>{doctor.reviews} verified patient reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{doctor.rating}</div>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= doctor.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Overall Rating</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5 ? "80%" : rating === 4 ? "15%" : "5%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">{review.patientName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Patient
                          </Badge>
                        )}
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          Not Helpful
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Write Review */}
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>Share your experience with Dr. {doctor.name.split(" ")[1]}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setNewRating(star)} className="focus:outline-none">
                      <Star
                        className={`h-6 w-6 ${star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  placeholder="Share your experience with this doctor..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleReviewSubmit}>Submit Review</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Availability</CardTitle>
              <CardDescription>When Dr. {doctor.name.split(" ")[1]} is available for appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Available Days</h4>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                    const fullDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][
                      index
                    ]
                    const isAvailable = doctor.availability.includes(fullDay)
                    return (
                      <div
                        key={day}
                        className={`text-center p-3 rounded-lg ${
                          isAvailable
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                        }`}
                      >
                        <div className="font-semibold">{day}</div>
                        <div className="text-xs">{isAvailable ? "Available" : "Unavailable"}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Typical Hours</h4>
                <div className="space-y-2">
                  {doctor.availability.map((day, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <span>{day}</span>
                      <span className="text-sm text-gray-600">9:00 AM - 5:00 PM</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Booking Information</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Appointments can be booked up to 3 months in advance</li>
                  <li>• Same-day appointments may be available for urgent concerns</li>
                  <li>• Please arrive 15 minutes early for your appointment</li>
                  <li>• Cancellations must be made 24 hours in advance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance & Payment</CardTitle>
              <CardDescription>Payment options and insurance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Consultation Fees</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Initial Consultation</span>
                    <span className="font-semibold">${doctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Follow-up Visit</span>
                    <span className="font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Ultrasound</span>
                    <span className="font-semibold">$250</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Insurance Accepted</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {doctor.insuranceAccepted.map((insurance, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded"
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">{insurance}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Payment Methods</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">Cash</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">Credit/Debit Cards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">Health Savings Account (HSA)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">Flexible Spending Account (FSA)</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Insurance Note</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please verify your insurance coverage before your appointment. Co-pays and deductibles may apply.
                  Contact your insurance provider to confirm coverage for prenatal care and delivery services.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
