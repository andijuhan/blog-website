export const createSlug = (text: string) => {
   return text
      .toLowerCase() // Ubah ke huruf kecil
      .replace(/[^\w\s-]/g, '') // Hapus karakter khusus kecuali spasi dan tanda hubung
      .trim() // Hapus spasi ekstra di awal dan akhir
      .replace(/\s+/g, '-'); // Ganti spasi dengan tanda hubung
};

export const verifySlug = (text: string) => {
   // Pola slug hanya boleh terdiri dari huruf kecil, angka, dan tanda hubung
   const pattern = /^[a-z0-9-]+$/;

   // Verifikasi apakah slug sesuai dengan pola
   if (pattern.test(text)) {
      return true;
   } else {
      return false;
   }
};
