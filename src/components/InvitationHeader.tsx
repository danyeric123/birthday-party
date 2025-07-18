export default function InvitationHeader() {
  return (
    <header className="bg-gray-800 text-white px-4 py-5 sm:px-6 sm:py-6 text-center">
      <div
        className="text-3xl sm:text-4xl mb-3 sm:mb-4 swirl-decoration"
        aria-hidden="true"
      >
        🎨✨🌀⭐🎉
      </div>
      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-pink-400 tracking-wider leading-tight">
        You're Invited to a Party
      </h1>
      <h2 className="text-xl sm:text-2xl font-display text-cyan-300 mt-1 sm:mt-2">
        at Cool Crafts!
      </h2>
      <p className="text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">
        www.coolcraftslongisland.com
      </p>
    </header>
  );
}
