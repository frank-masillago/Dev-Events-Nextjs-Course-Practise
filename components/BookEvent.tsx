'use client'
import {useState} from "react";

const BookEvent = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
