"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WheelChart } from "@/components/wheel-chart"
import { RotateCcw, TrendingUp } from "lucide-react"

const lifeAreas = [
  { key: "career", label: "Career", description: "Professional life and work satisfaction" },
  { key: "finances", label: "Finances", description: "Financial security and money management" },
  { key: "relationships", label: "Relationships", description: "Family, friends, and romantic relationships" },
  { key: "health", label: "Health", description: "Physical and mental well-being" },
  { key: "growth", label: "Personal Growth", description: "Learning, development, and self-improvement" },
  { key: "intimacy", label: "Sexual Life", description: "Intimacy and romantic satisfaction" },
  { key: "environment", label: "Environment", description: "Living space and surroundings" },
  { key: "spirituality", label: "Spirituality", description: "Spiritual beliefs and practices" },
]

export default function WheelOfLife() {
  const [ratings, setRatings] = useState<Record<string, number>>({
    career: 5,
    finances: 5,
    relationships: 5,
    health: 5,
    growth: 5,
    intimacy: 5,
    environment: 5,
    spirituality: 5,
  })

  const [showChart, setShowChart] = useState(false)

  const handleRatingChange = (area: string, value: number[]) => {
    setRatings((prev) => ({
      ...prev,
      [area]: value[0],
    }))
  }

  const resetRatings = () => {
    setRatings({
      career: 5,
      finances: 5,
      relationships: 5,
      health: 5,
      growth: 5,
      intimacy: 5,
      environment: 5,
      spirituality: 5,
    })
    setShowChart(false)
  }

  const generateChart = () => {
    setShowChart(true)
  }

  const averageRating = Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / 8

  const chartData = lifeAreas.map((area) => ({
    area: area.label,
    rating: ratings[area.key],
    fullMark: 10,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wheel of Life Assessment</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evaluate your satisfaction across eight key life areas. Rate each area from 1 (very dissatisfied) to 10
            (completely satisfied).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Assessment Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Life Areas Assessment
                </CardTitle>
                <CardDescription>Rate your current satisfaction level for each life area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {lifeAreas.map((area) => (
                  <div key={area.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={area.key} className="text-base font-medium">
                          {area.label}
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">{area.description}</p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {ratings[area.key]}/10
                      </Badge>
                    </div>
                    <Slider
                      id={area.key}
                      min={1}
                      max={10}
                      step={1}
                      value={[ratings[area.key]]}
                      onValueChange={(value) => handleRatingChange(area.key, value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Very Dissatisfied</span>
                      <span>Completely Satisfied</span>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button onClick={generateChart} className="flex-1">
                    Generate Wheel of Life
                  </Button>
                  <Button onClick={resetRatings} variant="outline" size="icon">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Display */}
          <div className="space-y-6">
            {showChart && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Wheel of Life</CardTitle>
                    <CardDescription>Visual representation of your life satisfaction across all areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WheelChart data={chartData} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Overall Life Satisfaction</span>
                        <Badge variant="default" className="text-lg px-3 py-1">
                          {averageRating.toFixed(1)}/10
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Areas for Improvement</h4>
                        {lifeAreas
                          .filter((area) => ratings[area.key] <= 5)
                          .map((area) => (
                            <div key={area.key} className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <span className="text-sm">{area.label}</span>
                              <Badge variant="destructive">{ratings[area.key]}/10</Badge>
                            </div>
                          ))}
                        {lifeAreas.filter((area) => ratings[area.key] <= 5).length === 0 && (
                          <p className="text-sm text-gray-500 italic">Great job! No areas need immediate attention.</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Strengths</h4>
                        {lifeAreas
                          .filter((area) => ratings[area.key] >= 8)
                          .map((area) => (
                            <div key={area.key} className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <span className="text-sm">{area.label}</span>
                              <Badge variant="default" className="bg-green-600">
                                {ratings[area.key]}/10
                              </Badge>
                            </div>
                          ))}
                        {lifeAreas.filter((area) => ratings[area.key] >= 8).length === 0 && (
                          <p className="text-sm text-gray-500 italic">
                            Focus on developing your strongest areas further.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!showChart && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to visualize your life?</h3>
                  <p className="text-gray-500 text-center mb-4">
                    Complete your ratings and click "Generate Wheel of Life" to see your personalized chart.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
