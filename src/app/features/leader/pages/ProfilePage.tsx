import { FormEvent, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function ProfilePage() {
  const { user, updateUser, changePassword } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [notice, setNotice] = useState("");

  const saveProfile = (event: FormEvent) => { event.preventDefault(); updateUser({ name, phone, avatarUrl }); setNotice("Profile updated."); };
  const savePassword = async (event: FormEvent) => {
    event.preventDefault();
    setNotice("");
    if (password.length < 8) { setNotice("New password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setNotice("New passwords do not match."); return; }
    setSavingPassword(true);
    const ok = await changePassword(currentPassword, password);
    setSavingPassword(false);
    setNotice(ok ? "Password changed successfully." : "The current password is incorrect or the new password is invalid.");
    if (ok) { setCurrentPassword(""); setPassword(""); setConfirmPassword(""); }
  };

  return (
    <div className="max-w-4xl space-y-5">
      <div><h2 className="text-2xl font-semibold">Profile</h2><p className="text-sm text-muted-foreground">Manage your profile, contact information, and password.</p></div>
      {notice && <p className="rounded-lg border bg-card p-3 text-sm text-muted-foreground">{notice}</p>}
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <form onSubmit={saveProfile} className="space-y-4 rounded-lg border bg-card p-5 shadow-sm">
          <label className="block text-sm font-medium">Full name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="block text-sm font-medium">Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="block text-sm font-medium">Profile picture URL<input value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Save profile</button>
        </form>
        <form onSubmit={savePassword} className="space-y-4 rounded-lg border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Change password</h3>
          <label className="block text-sm font-medium">Current password<input required type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="block text-sm font-medium">New password<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="block text-sm font-medium">Confirm new password<input required minLength={8} type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <button disabled={savingPassword} className="rounded-md border px-5 py-2.5 text-sm font-semibold transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">{savingPassword ? "Updating..." : "Update password"}</button>
        </form>
      </div>
    </div>
  );
}
