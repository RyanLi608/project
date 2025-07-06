"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("aboutUs")}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("aboutUsDescription")}
              </p>
              <Button size="lg">{t("ourMission")}</Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={t("aboutUs")}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("ourMission")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("missionDescription1")}
              </p>
              <p className="text-muted-foreground">
                {t("missionDescription2")}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("ourVision")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("visionDescription1")}
              </p>
              <p className="text-muted-foreground">
                {t("visionDescription2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {t("howItWorks")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("searchLandmark")}</h3>
              <p className="text-muted-foreground">
                {t("searchLandmarkDesc")}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("getAIContent")}</h3>
              <p className="text-muted-foreground">
                {t("getAIContentDesc")}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("experienceAudio")}</h3>
              <p className="text-muted-foreground">
                {t("experienceAudioDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {t("ourTeam")}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-muted mb-4 overflow-hidden relative">
                  <Image
                    src={`https://images.pexels.com/photos/${1000000 + member}/pexels-photo-${1000000 + member}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`}
                    alt={`${t("teamMember")} ${member}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-lg font-semibold">{t("teamMember")} {member}</h3>
                <p className="text-muted-foreground">{t("position")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("getInTouch")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("contactDescription")}
          </p>
          <Button size="lg">{t("contactUs")}</Button>
        </div>
      </section>
    </div>
  );
}