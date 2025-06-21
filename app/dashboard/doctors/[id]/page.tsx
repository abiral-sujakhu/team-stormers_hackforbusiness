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
    name: "Dr. Sita Sharma",
    specialty: "Obstetrician & Gynecologist",
    rating: 4.9,
    experience: 12,
    location: "Kathmandu Maternity Center",
    address: "123 Medical Plaza, Suite 200, Kathmandu, Nepal",
    phone: "9812345678",
    email: "dr.sita@kathmandumaternity.com",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Sita Sharma specializes in high-risk pregnancies and is dedicated to providing compassionate care to mothers throughout Nepal. She completed her residency at Tribhuvan University Teaching Hospital and has been practicing for over 12 years.",
    education: [
      "MD - Institute of Medicine, TU (2008)",
      "Residency - TUTH (2012)",
      "Fellowship - Maternal-Fetal Medicine, Patan Hospital (2014)",
    ],
    certifications: [
      "Board Certified in Obstetrics & Gynecology",
      "Maternal-Fetal Medicine Subspecialty",
      "Advanced Life Support in Obstetrics (ALSO)",
    ],
    specializations: ["High-risk pregnancies", "Prenatal care", "Natural birth", "C-sections", "Genetic counseling"],
    languages: ["English", "Nepali"],
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    consultationFee: 400,
    hospitalAffiliations: ["Kathmandu Maternity Center", "Patan Hospital", "Teaching Hospital"],
    awards: ["Top Doctor 2023 - Kathmandu Health Magazine", "Excellence in Maternal Care Award 2022", "Patient Choice Award 2021"],
  },
  "2": {
    id: 2,
    name: "Dr. Ram Bahadur Thapa",
    specialty: "Maternal-Fetal Medicine",
    rating: 4.8,
    experience: 15,
    location: "Patan Hospital",
    address: "456 Hospital Road, Patan, Nepal",
    phone: "9801122334",
    email: "dr.ram@patanhospital.com",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Ram Bahadur Thapa is an expert in maternal-fetal medicine, helping families with complex pregnancies across Nepal. He completed his fellowship at Patan Hospital and has over 15 years of experience.",
    education: [
      "MD - BPKIHS (2006)",
      "Residency - Patan Hospital (2010)",
      "Fellowship - Maternal-Fetal Medicine, Patan Hospital (2012)",
    ],
    certifications: [
      "Board Certified in Maternal-Fetal Medicine",
      "Genetic Counseling Certification",
      "Advanced Ultrasound Training",
    ],
    specializations: ["Fetal diagnostics", "Genetic counseling", "Multiple pregnancies", "Fetal surgery"],
    languages: ["English", "Nepali"],
    availability: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    consultationFee: 250,
    hospitalAffiliations: ["Patan Hospital", "Kathmandu Maternity Center"],
    awards: ["Best Maternal-Fetal Specialist 2022", "Research Excellence Award 2021"],
  },
  "3": {
    id: 3,
    name: "Dr. Mina Karki",
    specialty: "Certified Nurse Midwife",
    rating: 4.7,
    experience: 8,
    location: "Biratnagar Birth Center",
    address: "789 Birth Center Lane, Biratnagar, Nepal",
    phone: "9845671234",
    email: "dr.mina@biratnagarbirth.com",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Mina Karki empowers women through natural childbirth and provides personalized care for families in the eastern region. She is a certified nurse midwife with a passion for holistic care.",
    education: [
      "BSc Nursing - Purbanchal University (2012)",
      "Certified Nurse Midwife - Nepal Nursing Council (2014)",
    ],
    certifications: [
      "Certified Nurse Midwife",
      "Water Birth Specialist",
      "Breastfeeding Support Certification",
    ],
    specializations: ["Natural birth", "Water birth", "Home birth", "Breastfeeding support"],
    languages: ["English", "Nepali"],
    availability: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationFee: 150,
    hospitalAffiliations: ["Biratnagar Birth Center"],
    awards: ["Midwife of the Year 2023", "Community Care Award 2022"],
  },
  "4": {
    id: 4,
    name: "Dr. Bishal Adhikari",
    specialty: "Perinatologist",
    rating: 4.9,
    experience: 18,
    location: "Pokhara Regional Hospital",
    address: "321 Regional Hospital Road, Pokhara, Nepal",
    phone: "9865432109",
    email: "dr.bishal@pokharahospital.com",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Bishal Adhikari has extensive experience in managing high-risk pregnancies and complications in the western region. He is a leading perinatologist in Pokhara.",
    education: [
      "MD - Pokhara University (2004)",
      "Residency - Pokhara Regional Hospital (2008)",
      "Fellowship - Perinatology, Kathmandu University (2010)",
    ],
    certifications: [
      "Board Certified in Perinatology",
      "NICU Coordination Training",
      "Preterm Labor Management Certification",
    ],
    specializations: ["High-risk pregnancies", "Preterm labor", "Pregnancy complications", "NICU coordination"],
    languages: ["English", "Nepali"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    consultationFee: 300,
    hospitalAffiliations: ["Pokhara Regional Hospital", "Kathmandu Maternity Center"],
    awards: ["Perinatologist of the Year 2024", "Patient Care Excellence 2023"],
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

const doctorReviews: Record<string, Review[]> = {
  "1": [
    {
      id: 1,
      patientName: "Sarah Rai",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Dr. Sharma was amazing throughout my entire pregnancy. She was always available for questions and made me feel so comfortable. Highly recommend!",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      patientName: "Mona Tamang",
      rating: 5,
      date: "2024-01-05",
      comment:
        "Excellent care during my high-risk pregnancy. Dr. Sharma's expertise and compassion made all the difference. My baby and I are both healthy thanks to her.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      patientName: "Jenni K.",
      rating: 4,
      date: "2023-12-28",
      comment:
        "Very knowledgeable and professional. The only downside was sometimes having to wait a bit longer for appointments, but the quality of care made it worth it.",
      helpful: 5,
      verified: true,
    },
  ],
  "2": [
    {
      id: 4,
      patientName: "Ramesh Shrestha",
      rating: 5,
      date: "2024-02-15",
      comment:
        "Dr. Ram Bahadur Thapa provided excellent support during our complicated pregnancy. His expertise in fetal diagnostics is unmatched.",
      helpful: 10,
      verified: true,
    },
    {
      id: 5,
      patientName: "Anita Gurung",
      rating: 4,
      date: "2024-01-30",
      comment:
        "very thorough and caring. He explained every step and made us feel at ease.",
      helpful: 6,
      verified: true,
    },
  ],
  "3": [
    {
      id: 6,
      patientName: "Sunita Karki",
      rating: 5,
      date: "2024-03-10",
      comment:
        "Dr. Mina Karki was so supportive during my home birth. She made the experience calm and empowering.",
      helpful: 7,
      verified: true,
    },
    {
      id: 7,
      patientName: "Bina Rai",
      rating: 4,
      date: "2024-02-22",
      comment:
        "Great midwife, very knowledgeable about natural birth and breastfeeding support.",
      helpful: 4,
      verified: true,
    },
  ],
  "4": [
    {
      id: 8,
      patientName: "Kamal Adhikari",
      rating: 5,
      date: "2024-04-05",
      comment:
        "Dr. Bishal Adhikari managed my wife's high-risk pregnancy with great care. We are grateful for his expertise.",
      helpful: 9,
      verified: true,
    },
    {
      id: 9,
      patientName: "Maya Gurung",
      rating: 5,
      date: "2024-03-18",
      comment:
        "Very experienced and compassionate doctor. Highly recommended for complicated pregnancies.",
      helpful: 5,
      verified: true,
    },
  ],
}

export default function DoctorProfilePage() {
  const params = useParams()
  const doctorId = params.id as string
  const doctor = doctorData[doctorId as keyof typeof doctorData]
  const [reviews, setReviews] = useState<Review[]>(doctorReviews[doctorId] || [])
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="about" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
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

        <TabsContent value="reviews" className="space-y-4">
          {/* Review Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Reviews</CardTitle>
              <CardDescription>{reviews.length} verified patient reviews</CardDescription>
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
                  {[5, 4, 3, 2, 1].map((starValue) => (
                    <div key={starValue} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{starValue}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${starValue === 5 ? 80 : starValue === 4 ? 15 : 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {starValue === 5 ? "80%" : starValue === 4 ? "15%" : "5%"}
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
      </Tabs>
    </div>
  )
}
