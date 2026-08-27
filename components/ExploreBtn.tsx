'use client'
import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
    const handleExploreClick = () => {
        posthog.capture("explore_events_clicked");
        console.log('CLICK');
    };

    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleExploreClick}>
            <a href="#events">Explore Events</a>
            <Image src="icons/arrow-down.svg" alt="arrow down" width={24} height={24}/>
        </button>
    )
}
export default ExploreBtn
