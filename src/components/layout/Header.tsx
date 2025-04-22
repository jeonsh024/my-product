const Header = () => {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <h1 className="text-lg font-bold text-[--color-primary]">My App</h1>
      <nav className="space-x-4">
        <a href="#" className="text-sm text-gray-700 hover:text-[--color-primary]">
          Home
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-[--color-primary]">
          About
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-[--color-primary]">
          Contact
        </a>
      </nav>
    </header>
  )
}

export default Header
