# Contact Form Kurulumu

Contact formunuz Web3Forms servisi ile çalışacak şekilde yapılandırıldı. Backend'e ihtiyaç duymadan ücretsiz olarak mail gönderebilirsiniz.

## Kurulum Adımları

### 1. Web3Forms Hesabı Oluşturun (ÜCRETSİZ)

1. [https://web3forms.com](https://web3forms.com) adresine gidin
2. "Get Started for Free" butonuna tıklayın
3. Email adresinizi girin (mesajlar bu adrese gelecek: `erenatasoy04@gmail.com`)
4. Email'inizi doğrulayın
5. Access Key'inizi kopyalayın (örnek: `12345678-abcd-1234-efgh-123456789012`)

### 2. .env Dosyasını Oluşturun

Proje kök dizininde `.env` dosyası oluşturun:

```bash
# Windows PowerShell
Copy-Item env.example .env

# veya manuel olarak env.example dosyasını kopyalayıp .env olarak kaydedin
```

### 3. Access Key'i Ekleyin

`.env` dosyasını açın ve aşağıdaki satırı bulun:

```env
REACT_APP_WEB3FORMS_KEY=""
```

Access key'inizi ekleyin:

```env
REACT_APP_WEB3FORMS_KEY="12345678-abcd-1234-efgh-123456789012"
```

### 4. Uygulamayı Yeniden Başlatın

Dev server'ı durdurup yeniden başlatın:

```bash
# Ctrl + C ile durdurun
npm start
```

## Nasıl Çalışır?

1. **Web3Forms API Key Varsa:**

   - Form Web3Forms API'sine gönderilir
   - Mesajlar email'inize gelir
   - Başarılı/hata mesajları gösterilir

2. **Web3Forms API Key Yoksa (Fallback):**
   - Otomatik olarak mailto: linki açılır
   - Kullanıcının email istemcisi açılır
   - Kullanıcı kendi email uygulamasından gönderir

## Özellikler

✅ **Ücretsiz** - Aylık 250 mesaj limiti (yeterli)  
✅ **Backend Yok** - Herhangi bir sunucu gerektirmez  
✅ **Spam Koruması** - Honeypot ve reCAPTCHA desteği  
✅ **Email Bildirimleri** - Mesajlar direk mail adresinize gelir  
✅ **Kolay Kurulum** - 5 dakikada hazır

## Test Etme

1. Formu doldurun
2. "Send Message" butonuna tıklayın
3. "Message sent successfully!" mesajını görün
4. Email'inizi kontrol edin

## Sorun Giderme

### Mesajlar gelmiyor

1. Web3Forms dashboard'unda mail adresinizi doğruladınız mı?
2. `.env` dosyasında `REACT_APP_WEB3FORMS_KEY` doğru mu?
3. Spam klasörünü kontrol edin
4. Dev server'ı yeniden başlattınız mı?

### Console'da hata var

```javascript
// Browser console'u açın (F12)
// Herhangi bir hata görüyor musunuz?
```

### API Key çalışmıyor

Fallback olarak mailto: açılacaktır. Kullanıcı kendi email uygulamasından gönderebilir.

## Production (Vercel) için

Vercel'de environment variable ekleyin:

1. Vercel Dashboard → Project Settings
2. Environment Variables sekmesi
3. Ekleyin:
   - **Key:** `REACT_APP_WEB3FORMS_KEY`
   - **Value:** `your-access-key-here`
4. Redeploy edin

## Alternatif Servisler

Eğer Web3Forms işinize yaramazsa:

- **EmailJS** - [https://www.emailjs.com](https://www.emailjs.com)
- **Formspree** - [https://formspree.io](https://formspree.io)
- **Getform** - [https://getform.io](https://getform.io)

## Destek

Herhangi bir sorun için:

- Web3Forms Docs: [https://docs.web3forms.com](https://docs.web3forms.com)
- Web3Forms Support: [https://web3forms.com/contact](https://web3forms.com/contact)

