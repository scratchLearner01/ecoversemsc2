"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, MapPin, Calendar, Share2, Heart, MessageCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import { getProfileById } from "@/lib/profiles-database"
import { Button } from "@/components/ui/button"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const data = getProfileById(params.id)
    setProfile(data)
    setIsLoading(false)
  }, [params.id])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (isLoading) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <Navbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex animate-spin">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"></div>
            </div>
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <Navbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Profile Not Found</h1>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <main className="min-h-screen bg-background">
        {/* Hero Background */}
        <div className="h-40 bg-gradient-to-r from-primary/20 to-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float"></div>
            <div
              className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-12 relative z-10">
          {/* Back Button */}
          <Link href="/">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </Link>

          {/* Profile Card */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border animate-fade-in">
            {/* Profile Header */}
            <div className="px-8 py-8 bg-gradient-to-r from-background to-background/50 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${profile.avatarColor} flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-background animate-bounce-pop`}
                  >
                    {profile.avatar}
                  </div>

                  {/* Basic Info */}
                  <div className="animate-slide-in-left">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                      {profile.verified && (
                        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profile.city}, {profile.state}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(profile.joinDate).toLocaleDateString()}
                      </div>
                    </div>

                    <p className="text-foreground text-sm max-w-md">{profile.bio}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 animate-slide-in-right">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      liked ? "bg-red-500/10 text-red-500" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                  </button>
                  <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 py-6 border-b border-border bg-muted/50">
              <div
                className="text-center hover:bg-muted/50 rounded-lg p-3 transition-colors animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <p className="text-2xl font-bold text-primary">{profile.ecoPoints}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Eco Points</p>
              </div>
              <div
                className="text-center hover:bg-muted/50 rounded-lg p-3 transition-colors animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-2xl font-bold text-primary">{profile.actions}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Actions</p>
              </div>
              <div
                className="text-center hover:bg-muted/50 rounded-lg p-3 transition-colors animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <p className="text-2xl font-bold text-primary">{profile.completedProjects || 0}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Projects</p>
              </div>
              <div
                className="text-center hover:bg-muted/50 rounded-lg p-3 transition-colors animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {profile.level}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-2">Tier</p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-8 p-8">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-8">
                {/* Impact Stats */}
                {profile.impact && (
                  <div className="animate-slide-in-left">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Environmental Impact
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors">
                        <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {profile.impact.carbonSaved.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">kg</p>
                      </div>
                      <div className="bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors">
                        <p className="text-sm text-muted-foreground">Trees Planted</p>
                        <p className="text-2xl font-bold text-primary mt-1">{profile.impact.treesSaved}</p>
                        <p className="text-xs text-muted-foreground mt-1">trees</p>
                      </div>
                      <div className="bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors">
                        <p className="text-sm text-muted-foreground">Plastic Recycled</p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {profile.impact.plasticsRecycled.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">kg</p>
                      </div>
                      <div className="bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors">
                        <p className="text-sm text-muted-foreground">Water Saved</p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {profile.impact.waterSaved.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">liters</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contributions */}
                {profile.contributions && (
                  <div className="animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                    <h2 className="text-xl font-bold text-foreground mb-4">Key Contributions</h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.contributions.map((contrib: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                        >
                          {contrib}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {profile.skills && (
                  <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                    <h2 className="text-xl font-bold text-foreground mb-4">Expertise</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {profile.skills.map((skill: string, idx: number) => (
                        <div
                          key={idx}
                          className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
                        >
                          <p className="text-sm font-medium text-foreground">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Badges */}
                {profile.badges && profile.badges.length > 0 && (
                  <div className="animate-slide-in-right">
                    <h3 className="text-lg font-bold text-foreground mb-3">Achievements</h3>
                    <div className="space-y-2">
                      {profile.badges.map((badge: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-lg hover:from-primary/20 hover:to-secondary/20 transition-colors"
                        >
                          <Award className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Card */}
                <div
                  className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-4 animate-slide-in-right"
                  style={{ animationDelay: "0.1s" }}
                >
                  <h3 className="text-sm font-bold text-foreground mb-3">Get in Touch</h3>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground break-all">{profile.email}</p>
                    {profile.phone && <p className="text-xs text-muted-foreground">{profile.phone}</p>}
                  </div>
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:shadow-lg transition-all">
                    Message
                  </Button>
                </div>

                {/* Social Links */}
                {profile.socials && Object.keys(profile.socials).length > 0 && (
                  <div className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                    <h3 className="text-sm font-bold text-foreground mb-3">Connect</h3>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(profile.socials).map(([platform, url]: any, idx) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-xs font-semibold capitalize"
                          title={platform}
                        >
                          {platform.charAt(0).toUpperCase()}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
