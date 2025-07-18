import InvitationHeader from "./InvitationHeader";
import InvitationContent from "./InvitationContent";
import InvitationFooter from "./InvitationFooter";

export default function BirthdayInvitation() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white shadow-2xl overflow-hidden sm:rounded-2xl sm:my-8 transform hover:scale-[1.02] transition-transform duration-300">
        <InvitationHeader />
        <InvitationContent />
        <InvitationFooter />
      </div>
    </div>
  );
}
