import { Link } from "@inertiajs/react";

export default function Welcome() {
  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-b from-blue-500 via-blue-300 to-gray-300 px-4">
  <div className="flex flex-col md:flex-row justify-center gap-10 items-center">
    
    <img src="/favicon.png" className="h-32 md:h-40" />
    
    <div>
      <h1 className="text-4xl font-bold mb-2">Selamat datang</h1>
      <p className="max-w-md mx-auto text-gray-800">
        Aplikasi ini membantu tim dan perusahaan dalam mengelola tugas,
        proyek, dan progres pekerjaan dengan lebih teratur dan efisien.
      </p>
      
      <Link 
        href="/dashboard"
        className="mt-6 inline-block px-8 py-3 bg-black text-white text-lg border-4 border-gray-600 rounded-lg hover:scale-105 transition"
      >
        Mulai sekarang
      </Link>
    </div>
    
    <img src="/favicon.png" className="h-32 md:h-40" />

  </div>
</section>


      {/* Tentang Kami */}
      <section className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-10 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Tentang Kami</h2>
        <p className="text-justify leading-relaxed">
          Aplikasi web ini dirancang untuk menjadi solusi lengkap dalam memudahkan
          proses manajemen pekerjaan dan proyek dalam sebuah tim
          Kelola setiap pekerjaan dengan lebih terstruktur, cepat, dan transparan. Dengan sistem job management ini, setiap tugas dapat dipantau secara real-time,
          mulai dari proses penugasan, progress, hingga penyelesaian. Tim Anda dapat berkolaborasi dengan lebih efektif, mengurangi miskomunikasi,
          dan memastikan setiap pekerjaan selesai tepat waktu. Jadikan manajemen pekerjaan lebih mudah, terukur, dan efisien hanya dengan satu platform terpadu.
          Kami memahami bahwa pengelolaan pekerjaan sering kali memakan waktu...
 Tujuan utama kami adalah membantu tim bekerja lebih efisien...
        </p>
      </section>

      {/* Logo Mitra */}
      <div className="mt-14 flex justify-center gap-10 flex-wrap px-6">
        <img src="/logoupi .png" className="h-20" />
        <img src="/favicon.png" className="h-20" />
      </div>

      {/* Fitur */}
      <section className="max-w-6xl mx-auto mt-14 p-8 bg-gray-200 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Fitur</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "Manage Project",
            "Manage Pekerjaan",
            "Pemantauan",
            "Manage Users",
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <h3 className="font-semibold mb-2">{item}</h3>
              <img src="https://via.placeholder.com/300x160" className="rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Footer */}
      <footer className="mt-20 bg-[#003B73] text-white py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-center md:text-left px-6">
          <div>
            <h3 className="font-bold mb-3 ">Contact Us</h3>         
            <p>Universitas Pendidikan Indonesia</p>
            <p>Jl. Dr. Setiabudhi No. 229 Bandung</p>
            <p>Jawa Barat - Indonesia</p>
            <p>Email: sekuniv_upi@upi.edu</p>   
            <img src="/logoupi .png" className="h-20" />         
          </div>

          <div>
            <h3 className="font-bold mb-3 ml-95 ">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 text-xl ml-80">
              <a href="https://www.instagram.com/upiofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="hover:opacity-80"> <img src="ig.png" className="w-10 " /></a>
              <a href="https://www.tiktok.com/@upi.official?is_from_webapp=1&sender_device=pc" target="_blank" className="hover:opacity-80"> <img src="tt.png" className="w-10" /></a>
              <a href="https://www.facebook.com/upiofficial/" target="_blank" className="hover:opacity-80"><img src="fb.png" className="w-10" /></a>
              <a href="https://x.com/upi_official?t=O3IZ6huZ4IIuncfcKZuuiA&s=08 " target="_blank" className="hover:opacity-80"><img src="twit.png" className="w-10" /></a>
            </div>
          </div>

        </div>
        <p className="text-center mt-6 text-sm border-t border-white/30 mt-8 pt-4">
          © Universitas Pendidikan Indonesia 2025
        </p>
      </footer>
    </div>
  );
}
