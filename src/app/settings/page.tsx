import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SignOutButton from "@/components/common/SignOutButton";
import SettingForm from "@/components/user/SettingForm";

export const metadata: Metadata = {
  title: "Settings | next.js realworld example app",
};

const Settings = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingForm user={currentUser} />
            <br />
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
