"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface IEvent {
  eventTitle: string;
  eventImg: string;
  date: string;
  seats: number | string;
  location: string;
  description: string;
  time: string;
}

const Page = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<IEvent>({
    eventTitle: "",
    eventImg: "",
    date: "",
    seats: "",
    location: "",
    description: "",
    time: "",
  });

  // Fetch event details
  const fetchEventDetails = useCallback(async (eventID: string) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/events/event/${eventID}`);
      setEvent(res.data.event);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  }, []);

  // Create or update event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Convert time string ("HH:mm") to a full ISO string
    const selectedDate = new Date(event.date); // Convert event date to Date object
    const [hours, minutes] = event.time.split(":").map(Number);
    selectedDate.setHours(hours, minutes, 0, 0); // Set time on selected date
  
    try {
      const res = await axios.post("http://localhost:8080/api/events/create-event", {
        ...event,
        time: selectedDate.toISOString(), // Convert to full ISO string
      });
      router.push('/event')
      // console.log("Event created:", res.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  

  useEffect(() => {
    if (id) {
      fetchEventDetails(id);
    }
  }, [id, fetchEventDetails]);

  if (!id) return <div className="flex justify-center text-2xl">Loading...</div>;

  return (
    <div className="w-full mt-4 p-4 flex justify-center">
      <Card className="w-[34rem]">
        <CardHeader>
          <CardTitle className="text-center">Event Details</CardTitle>
          <CardDescription className="text-center">Edit your event details here!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Enter Your Title"
                  value={event.eventTitle}
                  onChange={(e) => setEvent({ ...event, eventTitle: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="des">Event Description</Label>
                <Textarea
                  id="des"
                  placeholder="Enter Description"
                  value={event.description}
                  onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Label htmlFor="date">Event Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={event.time}
                    onChange={(e) => setEvent({ ...event, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seat">Event Seats</Label>
                <Input
                  id="seat"
                  type="number"
                  placeholder="Enter Number of Seats"
                  value={event.seats}
                  onChange={(e) => setEvent({ ...event, seats: Number(e.target.value) })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="location">Event Location</Label>
                <Input
                  id="location"
                  placeholder="Enter Location"
                  value={event.location}
                  onChange={(e) => setEvent({ ...event, location: e.target.value })}
                />
              </div>
            </div>
            <Button className="w-full mt-4" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
