export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <p className="text-sm opacity-80">
              EcoVerse is a demo platform for sustainability tracking. Data shown is demo-sourced for prototype
              purposes.
            </p>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Partners</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Smart City Initiative
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  MoEFCC
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  TERI
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Impact
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Data Sources */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <p className="text-sm opacity-80 mb-4">
            <strong>Data sources and sample values:</strong> TERI / CPCB (India municipal waste ~62M tonnes/year),
            Global Carbon Project (global fossil CO₂ ~37.4 Gt, 2024), IQAir (city AQI examples).
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
              TERI ↗
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
              CPCB ↗
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
              Global Carbon Project ↗
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
              IQAir ↗
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; 2025 EcoVerse. All rights reserved.</p>
          <p>contact@ecoverse.in</p>
        </div>
      </div>
    </footer>
  )
}
