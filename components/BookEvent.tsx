'use client'
import {useState} from "react";
import {createBooking} from "@/lib/actions/booking.actions";
import posthog from "posthog-js";

const BookEvent = (eventId: string) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { success} = await createBooking({eventId, email});

        if(success){
            setSubmitted(true);
            posthog.capture("event_booked", { event_id: eventId, email: email });
        }
        else {
            console.error("create booking error:");
            posthog.captureException("create booking error");
        }

        e.preventDefault();

        setTimeout(() => {
            setSubmitted(true);
        }, 1000)
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ): (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button className="button-submit" type="submit" onClick={(e) => {
                            e.preventDefault();
                            setSubmitted(true);
                        }}>Book Now</button>
                    </div>
                </form>
            )}
        </div>
    )
}
export default BookEvent
