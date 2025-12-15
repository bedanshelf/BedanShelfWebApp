import { useNavigate } from "react-router-dom";
import FadeInOnView from "../Components/Animation/FadeInComponent";
import SanBedaBg from "/san-beda-bg.jpg";
import HeroButton from "../Components/UI/Buttons/HeroButton";
import HeroAccentButton from "../Components/UI/Buttons/HeroAccentButton";

export default function HomePage() {
  const navigate = useNavigate();

  const BrowseBooks = () => {
    navigate("/books", { replace: true });
  };

  const Login = () => {
    navigate("/login", { replace: true });
  };

  return (
    <main className="font-sans text-gray-900">
      {/* HERO SECTION */}
      <FadeInOnView>
        <section
          className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: `url(${SanBedaBg})`,
          }}
        >
          <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
          <div className="relative z-10 px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Welcome to BedanShelf
            </h1>
            <p className="text-lg md:text-2xl text-white mb-8">
              Discover amazing books
            </p>
            <HeroButton onClick={BrowseBooks}>Browse now</HeroButton>
          </div>
        </section>
      </FadeInOnView>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gray-50">
        <FadeInOnView className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "📚",
                title: "Easy to Use",
                desc: "Our app is simple and intuitive.",
              },
              {
                icon: "⚡",
                title: "Fast Performance",
                desc: "Lightning-fast transactions.",
              },
              {
                icon: "🥇",
                title: "Real-time Monitoring",
                desc: "Books are always on track.",
              },
            ].map((feature) => (
              <FadeInOnView
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.desc}</p>
              </FadeInOnView>
            ))}
          </div>
        </FadeInOnView>
      </section>

      {/* TESTIMONIALS SECTION */}
      {/* <section className="py-20 bg-white">
        <FadeInOnView className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "This app completely changed the way I organize my work!",
                user: "Jane D.",
              },
              {
                text: "Fast, reliable, and intuitive. Highly recommend!",
                user: "Mark S.",
              },
              {
                text: "Amazing customer support and constantly improving features.",
                user: "Lisa K.",
              },
            ].map((testi, index) => (
              <FadeInOnView
                key={index}
                className="p-6 bg-gray-50 rounded-xl shadow"
              >
                <p className="italic mb-4">{`"${testi.text}"`}</p>
                <span className="font-semibold">- {testi.user}</span>
              </FadeInOnView>
            ))}
          </div>
        </FadeInOnView>
      </section> */}

      {/* CTA / FOOTER SECTION */}
      <FadeInOnView className="py-20 px-10 bg-primary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="mb-8 text-lg md:text-xl">
          Join other users and start using the app today.
        </p>
        <HeroAccentButton onClick={Login}>Sign Up Now</HeroAccentButton>
      </FadeInOnView>
    </main>
  );
}
