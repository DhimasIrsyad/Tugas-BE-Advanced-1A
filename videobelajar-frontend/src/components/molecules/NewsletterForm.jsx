import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const NewsletterForm = ({ onSubmit }) => {
  return (
    /* PERBAIKAN MUTLAK: Satu kontainer bg-white membungkus input dan button sekaligus */
    /* Di HP flex-col (bertumpuk ke bawah), di PC md:flex-row (kembali menyatu ke samping) */
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row gap-3 md:gap-0 w-full max-w-md md:bg-white md:p-1 md:rounded-lg md:shadow-sm md:items-center md:h-11"
    >
      {/* Di HP pembungkus input ini punya bg-white sendiri, di PC menyatu bersih */}
      <div className="w-full bg-white p-2 md:p-0 rounded-lg md:rounded-none shadow-sm md:shadow-none flex items-center h-10 md:h-full md:pl-3">
        <Input type="email" placeholder="Masukkan Emailmu" />
      </div>

      {/* Button subscribe otomatis melebar penuh di HP, dan mengunci di kanan kontainer putih saat di PC */}
      <div className="w-full md:w-auto">
        <Button variant="primary" type="submit">
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default NewsletterForm;
