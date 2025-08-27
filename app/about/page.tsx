import Header from "../components/Header";

export default function About() {
  return (
    <main className="p-8">
      {/* <Header/> */}
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="mb-4">
        Welcome to our Movie Reservation System! We are dedicated to providing
        you with the best experience for booking movie tickets online.
      </p>
      <p className="mb-4">
        Our platform allows you to browse through a wide selection of movies,
        view showtimes, and reserve your seats with ease. Whether you're
        planning a solo movie night or a group outing, we've got you covered.
      </p>
      <p>
        Thank you for choosing our service. We hope you enjoy your movie
        experience!
      </p>
    </main>
  );
}