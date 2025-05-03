const Header = () => {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-center sticky top-0 z-50">
      <nav className="space-x-4">
        <a
          href="#"
          className="text-sm text-gray-700 hover:text-[--color-primary]"
        >
          기술
        </a>
        <a
          href="#"
          className="text-sm text-gray-700 hover:text-[--color-primary]"
        >
          경력
        </a>
        <a
          href="#"
          className="text-sm text-gray-700 hover:text-[--color-primary]"
        >
          프로젝트
        </a>
      </nav>
    </header>
  );
};

export default Header;
