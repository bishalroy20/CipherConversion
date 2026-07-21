import React from "react";

function Contact() {
  const people = [
    {
      name: "Nayeen",
      Reg: '2021331505',
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Abdullah",
      Reg: '2021331511',
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Bishal",
      Reg: '2021331518',
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Rajon",
      Reg: '2021331527',
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Yeasin",
      Reg: '2021331543',
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Adnan",
      Reg: '2021331545',
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Pinak",
      Reg: '2021331557',
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Robiul",
      Reg: '2021331564',
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Contact Our Team
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {people.map((person, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center shadow-lg"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-cyan-500"
              />
              <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
              <p className="text-gray-400">{person.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
