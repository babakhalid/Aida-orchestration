"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, ChevronLeft, ChevronRight, Trophy, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import type { LucideIcon } from "lucide-react";

// Dummy data for services, dates, and timeslots
const services = [
  { id: "sports", name: "Sports Facility", icon: Trophy },
  { id: "study", name: "Study Room", icon: Book },
];

const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

const timeslots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
];

// Interface for the result prop
interface CampusPlusResult {
  services?: Array<{ id: string; name: string; icon?: LucideIcon }>;
  availableDates?: string[];
  availableTimeslots?: string[];
}

interface CampusPlusProps {
  result: CampusPlusResult;
}

const CampusPlus: React.FC<CampusPlusProps> = ({ result }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);

  // Use result if provided, otherwise fallback to dummy data
  const availableServices = result.services || services;
  const availableDates = result.availableDates
    ? result.availableDates.map((d) => new Date(d))
    : dates;
  const availableTimeslots = result.availableTimeslots || timeslots;

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedDate) return;
    if (step === 3 && !selectedTimeslot) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleConfirm = () => {
    alert(
      `Booking confirmed!\nService: ${selectedService}\nDate: ${format(
        selectedDate!,
        "PPP"
      )}\nTimeslot: ${selectedTimeslot}`
    );
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTimeslot(null);
  };

  const steps = [
    { id: 1, title: "Service" },
    { id: 2, title: "Date" },
    { id: 3, title: "Time" },
    { id: 4, title: "Confirm" },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto my-6 border-none shadow-sm bg-white dark:bg-neutral-900">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Book a Facility
          </h2>
          <Calendar className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        </div>

        {/* Step Indicator */}
        <div className="relative flex justify-between mb-10">
          <div className="absolute top-2 w-full h-1 bg-neutral-200 dark:bg-neutral-700" />
          <div className="absolute top-2 h-1 bg-blue-500 transition-all duration-300 ease-in-out"
               style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} />
          {steps.map((s) => (
            <div key={s.id} className="relative flex flex-col items-center z-10">
              <motion.div
                className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium",
                  step >= s.id
                    ? "bg-blue-500 text-white"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                )}
                animate={{ scale: step === s.id ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {step > s.id ? <Check className="h-3 w-3" /> : s.id}
              </motion.div>
              <span className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Select a Service
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableServices.map((service) => {
                  const Icon = service.icon || Calendar;
                  return (
                    <Button
                      key={service.id}
                      variant="outline"
                      className={cn(
                        "h-auto py-3 px-4 flex items-center gap-3 border-neutral-200 dark:border-neutral-700",
                        "hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                        selectedService === service.id && "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                      )}
                      onClick={() => setSelectedService(service.id)}
                      aria-label={`Select ${service.name}`}
                    >
                      <Icon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                      <span className="text-sm font-medium">{service.name}</span>
                    </Button>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedService}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label="Proceed to next step"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Choose a Date
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableDates.map((date) => (
                  <Button
                    key={date.toISOString()}
                    variant="outline"
                    className={cn(
                      "py-2 text-sm border-neutral-200 dark:border-neutral-700",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                      selectedDate?.toISOString() === date.toISOString() &&
                        "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                    )}
                    onClick={() => setSelectedDate(date)}
                    aria-label={`Select date ${format(date, "PPP")}`}
                  >
                    {format(date, "MMM d, yyyy")}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-neutral-200 dark:border-neutral-700"
                  aria-label="Go back to previous step"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedDate}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label="Proceed to next step"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Select a Timeslot
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableTimeslots.map((slot) => (
                  <Button
                    key={slot}
                    variant="outline"
                    className={cn(
                      "py-2 text-sm border-neutral-200 dark:border-neutral-700",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                      selectedTimeslot === slot &&
                        "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                    )}
                    onClick={() => setSelectedTimeslot(slot)}
                    aria-label={`Select timeslot ${slot}`}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-neutral-200 dark:border-neutral-700"
                  aria-label="Go back to previous step"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedTimeslot}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label="Proceed to next step"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Confirm Your Booking
              </h3>
              <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Service</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {availableServices.find((s) => s.id === selectedService)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Date</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {format(selectedDate!, "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Timeslot</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {selectedTimeslot}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-neutral-200 dark:border-neutral-700"
                  aria-label="Go back to previous step"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label="Confirm booking"
                >
                  Confirm <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default React.memo(CampusPlus);