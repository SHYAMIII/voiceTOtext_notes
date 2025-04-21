export default function Footer() {
  return (
    <footer className="flex items-center bg-gray-900 justify-center w-full h-12 border-t">
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-400">
          Copyright &copy; {new Date().getFullYear()} SpeakEasy 2.0. All rights reserved.
        </p>
      </div>
    </footer>
  )
}