import BookEvent from "@/components/BookEvent";
import LightRays from "@/components/LightRays";
import Section from "@/components/Section";

const HomePage = () => {
  return (
    <>
      <LightRays />
      <main>
        <Section id="header">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold">Next.js Course</h1>
            <p className="mt-4 text-lg">Learn how to build a Next.js app from scratch</p>
            <div className="mt-8">
              <BookEvent />
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default HomePage;
