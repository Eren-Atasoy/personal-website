# 🔑 GitHub Token Kurulum Rehberi

## ❌ Problem: Rate Limit Hatası

```json
{
  "message": "API rate limit exceeded for 104.28.212.150.",
  "documentation_url": "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
}
```

**Sebep:** GitHub, kimlik doğrulaması olmayan istekler için saatte **60 request** limiti koyuyor.

**Çözüm:** Personal Access Token kullanarak limite **5000 request/saat** çıkarın!

---

## 🚀 Çözüm 1: GitHub Personal Access Token (Önerilen)

### Adım 1: Token Oluşturma

1. **GitHub'a giriş yapın**
2. Şu linke gidin: https://github.com/settings/tokens
3. **"Generate new token"** → **"Generate new token (classic)"** tıklayın
4. Token bilgilerini girin:
   - **Note:** "Portfolio Website" (veya istediğiniz bir isim)
   - **Expiration:** 90 days (veya No expiration)
   - **Scopes:** Sadece `public_repo` seçin (public repolar için yeterli)
5. **"Generate token"** butonuna tıklayın
6. ⚠️ **Token'ı kopyalayın** - Bir daha göremezsiniz!

### Adım 2: Token'ı Projeye Ekleme

#### Yöntem A: `.env` Dosyası (Önerilen - Güvenli)

1. Proje root dizininde `.env` dosyası oluşturun:
   ```bash
   # Windows
   echo. > .env
   
   # macOS/Linux
   touch .env
   ```

2. `.env` dosyasına şunu ekleyin:
   ```env
   REACT_APP_GITHUB_TOKEN=ghp_your_actual_token_here
   ```

3. **Önemli:** `.env` dosyası `.gitignore` içinde olmalı (zaten var)

4. Development server'ı yeniden başlatın:
   ```bash
   npm start
   ```

#### Yöntem B: Doğrudan Kod İçinde (Geçici - Test İçin)

`src/services/githubService.js` dosyasında:

```javascript
// ⚠️ Bu yöntemi sadece test için kullanın!
const GITHUB_TOKEN = 'ghp_your_actual_token_here';
```

⚠️ **UYARI:** Token'ı kod içine eklerseniz, GitHub'a push etmeyin!

---

## 🛠 Çözüm 2: Fallback Data (Token Olmadan)

Eğer token kullanmak istemiyorsanız, fallback data ekleyebiliriz:

### `src/data/fallbackRepos.js` oluşturun:

```javascript
// Fallback repository data (token olmadan çalışması için)
export const fallbackRepos = [
  {
    id: 1,
    name: "CSharp-Basic-1-MaskTracking",
    description: "Bu projede oop temellerini ve tc kimlik kontrol servisinin nasıl projeye entegre edildiğini öğrendim.",
    html_url: "https://github.com/Eren-Atasoy/CSharp-Basic-1-MaskTracking",
    homepage: null,
    language: "C#",
    stargazers_count: 0,
    updated_at: "2024-01-15T10:00:00Z",
    fork: false
  },
  {
    id: 2,
    name: "CSharp-Basic-2-CourseTask",
    description: "Katmanlı mimariye giriş.",
    html_url: "https://github.com/Eren-Atasoy/CSharp-Basic-2-CourseTask",
    homepage: null,
    language: "C#",
    stargazers_count: 0,
    updated_at: "2024-01-10T10:00:00Z",
    fork: false
  },
  {
    id: 3,
    name: "Prolingo",
    description: "Kısa hikayelerle ingilizce öğreten mobil uygulama.",
    html_url: "https://github.com/Eren-Atasoy/Prolingo",
    homepage: null,
    language: "Dart",
    stargazers_count: 0,
    updated_at: "2024-01-05T10:00:00Z",
    fork: false
  },
  {
    id: 4,
    name: "movie-ai-recommendation",
    description: "A web application that provides AI-powered movie recommendations based on user preferences.",
    html_url: "https://github.com/Eren-Atasoy/movie-ai-recommendation",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    updated_at: "2024-01-01T10:00:00Z",
    fork: false
  },
  {
    id: 5,
    name: "chapchap",
    description: "Dart project",
    html_url: "https://github.com/Eren-Atasoy/chapchap",
    homepage: null,
    language: "Dart",
    stargazers_count: 0,
    updated_at: "2023-12-20T10:00:00Z",
    fork: false
  },
  {
    id: 6,
    name: "42_Libft",
    description: "42 School Libft project",
    html_url: "https://github.com/Eren-Atasoy/42_Libft",
    homepage: null,
    language: "C",
    stargazers_count: 0,
    updated_at: "2023-12-15T10:00:00Z",
    fork: false
  }
];
```

### `src/services/githubService.js`'i güncelleyin:

```javascript
import { fallbackRepos } from '../data/fallbackRepos';

export const fetchGitHubRepos = async () => {
  try {
    // ... existing code ...
    
    const repos = await response.json();
    // ... existing code ...
    
  } catch (error) {
    console.error('Error fetching GitHub repos, using fallback data:', error);
    
    // Use fallback data
    return fallbackRepos.map((repo, index) => ({
      id: repo.id,
      title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
      description: repo.description || 'No description available',
      image: `https://opengraph.githubassets.com/1/Eren-Atasoy/${repo.name}`,
      technologies: extractTechnologies(repo),
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || repo.html_url,
      featured: index < 3,
      stars: repo.stargazers_count,
      language: repo.language,
      updatedAt: repo.updated_at,
    }));
  }
};
```

---

## ✅ Hangi Yöntemi Seçmeliyim?

### 🏆 Önerilen: Çözüm 1 (GitHub Token)

**Avantajları:**
- ✅ Gerçek zamanlı veriler
- ✅ Otomatik güncelleme
- ✅ Yüksek rate limit (5000/saat)
- ✅ Professional

**Dezavantajları:**
- ⚠️ Token yönetimi gerekli
- ⚠️ 90 günde bir yenileme (veya expiration yok)

### 💡 Alternatif: Çözüm 2 (Fallback Data)

**Avantajları:**
- ✅ Token gerektirmez
- ✅ Hızlı yükleme
- ✅ Rate limit yok

**Dezavantajları:**
- ❌ Manuel güncelleme gerekli
- ❌ Statik veri

---

## 🔐 Güvenlik Notları

1. **Token'ı asla GitHub'a push etmeyin!**
2. `.env` dosyası `.gitignore` içinde olmalı
3. Token'ı sadece `.env` dosyasında tutun
4. Public repolar için `public_repo` scope'u yeterli
5. Token'ı periyodik olarak yenileyin

---

## 🧪 Test Etme

Token ekledikten sonra:

1. Development server'ı yeniden başlatın:
   ```bash
   npm start
   ```

2. Browser console'u açın (F12)

3. Projects section'a gidin

4. Console'da hata olmamalı ve repolar yüklenmeli

---

## 📊 Rate Limit Kontrolü

Token çalışıyor mu kontrol etmek için:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/rate_limit
```

Sonuç:
```json
{
  "rate": {
    "limit": 5000,     // ✅ Token ile
    "remaining": 4999,
    "reset": 1234567890
  }
}
```

Token olmadan:
```json
{
  "rate": {
    "limit": 60,       // ❌ Token olmadan
    "remaining": 0,
    "reset": 1234567890
  }
}
```

---

## 🆘 Sorun Giderme

### Token çalışmıyor:
1. `.env` dosyasını oluşturdunuz mu?
2. `REACT_APP_` prefix'i var mı?
3. Development server'ı yeniden başlattınız mı?
4. Token doğru kopyalandı mı?

### Hala rate limit hatası:
1. Token scope'larını kontrol edin
2. Token expired olmadığından emin olun
3. Browser cache'i temizleyin

---

## 📝 Özet

**En Hızlı Çözüm:**

1. https://github.com/settings/tokens → Token oluştur
2. `.env` dosyası oluştur
3. `REACT_APP_GITHUB_TOKEN=your_token_here` ekle
4. `npm start` ile yeniden başlat
5. ✅ Çalışıyor!
