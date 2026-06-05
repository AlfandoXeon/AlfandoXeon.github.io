

const jamSaatIni = new Date().getHours();
let sapaan;
if (jamSaatIni < 12) {
  sapaan = "selamat pagi";
} else if (jamSaatIni < 18) {
  sapaan = "selamat siang";
} else {
  sapaan = "selamat malam";
}   



//function bukaWhatsapp() 
function bukaWhatsapp() {
//   window.open(linkWhatsapp, "_blank");
    cekInputKosongAtauTidak();
}









function kirimkanPesanSekarangJuga() {
    let teks = `${sapaan} tyoo... \nini aku ${document.getElementById("namaKamu").value} 😊😊😊 

maaf yah kalo tbtb aku chat long text begini...
btw gimana kabar kamu hari ini? semoga baik baik aja yaa kamu hari ini.. 
kalo kamu uda ga sibuk, nanti tolong baca pesanku ini yaa😉\naku ada mau ngoomong sesuatu sama kamu hehe.. 
sebenernya ya tyo, kalo boleh jujur aku udah suka sama kamu dari lama..
kamu baik, kamu ganteng, kamu perhatian... dan mungkin itu yang membuat ku suka sama kamu..
aku tau ini mungkin agak terburu buru, tapi aku nggak bisa bohong sama perasaan sendiri. aku suka sama kamu tyooo🥺🥺 aku suka cara kamu tersenyum, cara kamu berbicara, dan kamu selalu membuatku nyaman ketika sama kamu..
aku nggak tau apa kamu ngerasa hal yang sama, tapi aku ingin jujur sama kamu. aku suka kamu, tyo.. dan aku ingin tau apa kamu mau pacaran sama aku?
apapun jawabannya, aku akan tetap menghargai jawaban kamu... tapi kalo kamu juga merasa sama, aku akan sangat senang jika kita bisa lebih dari teman..
maaf kalo ini terlalu berani, tapi aku nggak bisa menahan lagi. aku harus jujur sama kamu.. :)`;

    const linkWhatsapp = `https://wa.me/6285764175824?text=${encodeURIComponent(teks)}`;


    window.open(linkWhatsapp, "_blank");


    }


function alertKonfirmasi() {

    // if (nama === "") {
    //     alert("Isi nama sama nomor dana-nya dulu donk .. kalo ga diisi gimana donk aku mau kirim saldo nya ( emote sedih )");
    //     return;
    // }

  const konfirmasi = confirm(`Nomor dana kamu adalah ${document.getElementById("nomorDana").value}, dan nama kamu adalah ${document.getElementById("namaKamu").value}. Apakah sudah sesuai? `);
    if (konfirmasi) {
        kirimkanPesanSekarangJuga();
    } else {
        //alert("Ulangi Lagi");
    }

}


function cekInputKosongAtauTidak() {
    const nama = document.getElementById("namaKamu").value;
    const nomordanaa = document.getElementById("nomorDana").value;
    if (nama === "" || nomordanaa === "") {
        alert("Isi nama sama nomor dana-nya dulu donk .. kalo ga diisi gimana donk aku mau kirim saldo nya ( emote sedih )");
        return;
    }
    else {
        alertKonfirmasi();
    }


    window.namaGlobal = nama;
    window.nomorDanaGlobal = nomordanaa;
}

let nama;
let nomordanaa;


