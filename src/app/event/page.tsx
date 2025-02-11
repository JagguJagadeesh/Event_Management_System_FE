"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState, useCallback } from "react"

interface IEvent {
  _id: string;
  eventTitle: string;
  seats: number;
  description: string;
  date: string;
}

const Page = () => {
  const [userID] = useState<string>("67a85b6de7e41c92036900a3");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch events using useCallback to prevent unnecessary re-creations of the function
  const fetchListOfEvents = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/events/${userID}`);
      setEvents(res.data.events);
      // console.log(res)
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [userID]);

  // Fetch events on component mount
  useEffect(() => {
    fetchListOfEvents();
  }, [fetchListOfEvents]);

  return (
    <div className="flex flex-col p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl">Current Events</h2>
        <Button className="sm:text-xl flex items-center gap-2">
          <Plus size={24} />
          Create
        </Button>
      </div>

      {/* Events Table */}
      <div>
        {loading ? (
          <p className="text-3xl text-center">Loading...</p>
        ) : events.length > 0 ? (
          <Table>
            <TableCaption>A list of your recent events.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Event Title</TableHead>
                <TableHead className="text-lg">Participants</TableHead>
                <TableHead className="text-lg">Description</TableHead>
                <TableHead className="text-lg">Date</TableHead>
                <TableHead className="text-lg">Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.eventTitle}</TableCell>
                  <TableCell>{event.seats}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <Link className="px-4 py-2 rounded border text-white bg-violet-700" href={`/event/${event._id}`}>
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-3xl text-center">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
