
import React from "react";

type SectionProps = {
    children: React.ReactNode;
    id: string;
}

const Section = ({children, id}: SectionProps) => {
    return (
        <section id={id} className="h-screen">
            {children}
        </section>
    )
}

export default Section;