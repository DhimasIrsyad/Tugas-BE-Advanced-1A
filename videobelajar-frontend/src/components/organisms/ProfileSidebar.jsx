import React from "react";
import Heading from "../atoms/Heading";
import TextDescription from "../atoms/TextDescription";
import Button from "../atoms/Button";

const ProfileSidebar = () => {
  return (
    <aside className="md:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm h-fit space-y-2 w-full">
      <div className="mb-4 text-left">
        {/* REUSE: Menggunakan kembali Atom Anda */}
        <Heading variant="section" className="text-lg">
          Ubah Profil
        </Heading>
        <TextDescription variant="section" className="text-xs">
          Ubah data diri Anda
        </TextDescription>
      </div>

      {/* REUSE: Menggunakan kembali Atom Button Anda dengan penyesuaian kelas warna */}
      <Button
        type="button"
        className="!w-full bg-amber-50 !text-amber-600 border border-amber-200 !py-2"
      >
        👤 Profil Saya
      </Button>
      <Button
        type="button"
        className="!w-full bg-transparent hover:bg-gray-50 !text-gray-500 !py-2 shadow-none"
      >
        📖 Kelas Saya
      </Button>
      <Button
        type="button"
        className="!w-full bg-transparent hover:bg-gray-50 !text-gray-500 !py-2 shadow-none"
      >
        🛍️ Pesanan Saya
      </Button>
    </aside>
  );
};

export default ProfileSidebar;
