function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        {/* O nas */}
        <div>
          <h3 className="text-lg font-semibold mb-4">O nas</h3>
          <p>
            Jesteśmy firmą z wieloletnim doświadczeniem w branży, oferującą
            wysokiej jakości produkty. Naszą misją jest zadowolenie klientów.
          </p>
        </div>
        {/* Pomoc i Wsparcie */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pomoc i Wsparcie</h3>
          <ul className="space-y-2">
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:underline">
                Zwroty i wymiany
              </a>
            </li>
            <li>
              <a href="/payment" className="hover:underline">
                Metody płatności
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:underline">
                Dostawa
              </a>
            </li>
          </ul>
        </div>
        {/* Kontakt */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
          <p>Email: kontakt@firma.pl</p>
          <p>Telefon: +48 123 456 789</p>
          <p>Adres: Ul. Przykładowa 12, 00-000 Warszawa</p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/FarbomaniaKozienice/?locale=pl_PL"
              aria-label="Facebook"
              className="hover:text-gray-400"
            >
              FB
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-400">
              IG
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
              IN
            </a>
          </div>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p>
            Zapisz się, aby otrzymywać informacje o nowościach i promocjach.
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Twój email"
              className="w-full p-2 rounded-md text-gray-800"
            />
            <button className="w-full mt-2 p-2 bg-blue-500 rounded-md hover:bg-blue-600">
              Zapisz się
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-5">
        © 2024 Firma. Wszelkie prawa zastrzeżone. |{" "}
        <a href="/privacy" className="hover:underline">
          Polityka prywatności
        </a>{" "}
        |{" "}
        <a href="/terms" className="hover:underline">
          Regulamin
        </a>
      </div>
    </footer>
  );
}

export default Footer;
