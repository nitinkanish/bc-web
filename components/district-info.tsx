"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Thermometer, Users, Briefcase, Plane, Utensils, Music, School, Phone, HelpCircle } from "lucide-react"
import type { DistrictInfo } from "@/lib/district-data"

interface DistrictInfoProps {
  district: DistrictInfo
}

export default function DistrictInformation({ district }: DistrictInfoProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="mt-8">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tourism">Tourism</TabsTrigger>
          <TabsTrigger value="practical">Practical Info</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Geography */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  Geography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Area</dt>
                    <dd>{district.geography.area}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Elevation</dt>
                    <dd>{district.geography.elevation}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Terrain</dt>
                    <dd>{district.geography.terrain}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Rivers</dt>
                    <dd>{district.geography.rivers.join(", ")}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Climate */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Thermometer className="h-5 w-5 mr-2" />
                  Climate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Summer</dt>
                    <dd>{district.climate.summer}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Winter</dt>
                    <dd>{district.climate.winter}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Rainfall</dt>
                    <dd>{district.climate.rainfall}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Best Time to Visit</dt>
                    <dd>{district.climate.bestTimeToVisit}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Demographics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2" />
                  Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Population</dt>
                    <dd>{district.demographics.population}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Density</dt>
                    <dd>{district.demographics.density}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Literacy</dt>
                    <dd>{district.demographics.literacy}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Languages</dt>
                    <dd>{district.demographics.languages.join(", ")}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Economy */}
            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Economy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Main Sectors</h4>
                    <ul className="list-disc list-inside">
                      {district.economy.mainSectors.map((sector, index) => (
                        <li key={index}>{sector}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Specialties</h4>
                    <ul className="list-disc list-inside">
                      {district.economy.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Industries</h4>
                    <ul className="list-disc list-inside">
                      {district.economy.industries.map((industry, index) => (
                        <li key={index}>{industry}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tourism Tab */}
        <TabsContent value="tourism" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attractions */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tourist Attractions</CardTitle>
                <CardDescription>Popular places to visit in {district.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {district.tourism.attractions.map((attraction, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium">{attraction.name}</h4>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-muted mt-1 mb-2">
                        {attraction.type}
                      </span>
                      <p className="text-sm text-muted-foreground">{attraction.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Festivals */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Festivals</CardTitle>
                <CardDescription>Local celebrations and events</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {district.tourism.festivals.map((festival, index) => (
                    <li key={index}>{festival}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Best Time to Visit */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Best Time to Visit</CardTitle>
                <CardDescription>Seasonal information for travelers</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{district.climate.bestTimeToVisit}</p>
                <div className="mt-4 space-y-2">
                  <div>
                    <h4 className="text-sm font-medium">Summer</h4>
                    <p className="text-sm text-muted-foreground">{district.climate.summer}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Winter</h4>
                    <p className="text-sm text-muted-foreground">{district.climate.winter}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Rainfall</h4>
                    <p className="text-sm text-muted-foreground">{district.climate.rainfall}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Practical Info Tab */}
        <TabsContent value="practical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transportation */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Plane className="h-5 w-5 mr-2" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium">Nearest Airport</dt>
                    <dd className="text-sm text-muted-foreground">{district.transportation.nearestAirport}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Railway Connectivity</dt>
                    <dd className="text-sm text-muted-foreground">{district.transportation.railwayConnectivity}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Road Connectivity</dt>
                    <dd className="text-sm text-muted-foreground">{district.transportation.roadConnectivity}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Local Transport</dt>
                    <dd className="text-sm text-muted-foreground">
                      {district.transportation.localTransport.join(", ")}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium">Police</dt>
                    <dd className="text-sm text-muted-foreground">{district.emergencyContacts.police}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Ambulance</dt>
                    <dd className="text-sm text-muted-foreground">{district.emergencyContacts.ambulance}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Fire Station</dt>
                    <dd className="text-sm text-muted-foreground">{district.emergencyContacts.fireStation}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium">Tourist Helpline</dt>
                    <dd className="text-sm text-muted-foreground">{district.emergencyContacts.touristHelpline}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Healthcare</CardTitle>
                <CardDescription>Major hospitals and medical facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {district.healthcare.majorHospitals.map((hospital, index) => (
                    <li key={index}>{hospital}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <School className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Universities</h4>
                    <ul className="list-disc list-inside">
                      {district.education.universities.map((university, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {university}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Colleges</h4>
                    <ul className="list-disc list-inside">
                      {district.education.colleges.map((college, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {college}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Culture Tab */}
        <TabsContent value="culture" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditions and Culture */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Music className="h-5 w-5 mr-2" />
                  Traditions & Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Traditions</h4>
                    <ul className="list-disc list-inside">
                      {district.culture.traditions.map((tradition, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {tradition}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Folk Dances</h4>
                    <ul className="list-disc list-inside">
                      {district.culture.dances.map((dance, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {dance}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Crafts</h4>
                    <ul className="list-disc list-inside">
                      {district.culture.crafts.map((craft, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {craft}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cuisine */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Utensils className="h-5 w-5 mr-2" />
                  Local Cuisine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Famous Dishes</h4>
                    <ul className="list-disc list-inside">
                      {district.cuisine.famousDishes.map((dish, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {dish}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Specialties</h4>
                    <ul className="list-disc list-inside">
                      {district.cuisine.specialties.map((specialty, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="h-5 w-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Common questions about {district.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {district.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

