# 🔗 API Integration Guide

## GitHub & Medium Entegrasyonu

Bu projede **GitHub API** ve **Medium RSS Feed** kullanılarak dinamik içerik çekme özelliği eklenmiştir.

## 🎯 Özellikler

### 1. **GitHub Repositories Integration**

- ✅ Otomatik olarak GitHub hesabınızdan repository'leri çeker
- ✅ Yıldız sayısına ve güncellenme tarihine göre sıralar
- ✅ Fork edilmiş repo'ları filtreler
- ✅ Teknolojileri otomatik tespit eder
- ✅ Repository kartlarına tıklandığında GitHub'a yönlendirir
- ✅ Featured badge (ilk 3 repo)

### 2. **Medium Articles Integration**

- ✅ Otomatik olarak Medium hesabınızdan yazıları çeker
- ✅ RSS2JSON API kullanır
- ✅ Okuma süresi hesaplar
- ✅ Tag'leri gösterir
- ✅ Makale kartlarına tıklandığında Medium'a yönlendirir
- ✅ Featured badge (ilk 2 makale)

## 📁 Dosya Yapısı

```
src/
├── services/
│   ├── githubService.js    # GitHub API servisi
│   └── mediumService.js    # Medium RSS servisi
├── components/
│   ├── Projects.js         # GitHub repos gösterir
│   └── Blog.js            # Medium articles gösterir
```

## 🔧 Nasıl Çalışır?

### GitHub API

```javascript
// src/services/githubService.js
const GITHUB_USERNAME = "Eren-Atasoy";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
```

**Özellikler:**

- Public API (token gerekmez)
- Rate limit: 60 request/saat (unauthenticated)
- Otomatik teknoloji tespiti
- Star ve update date'e göre sıralama

### Medium RSS Feed

```javascript
// src/services/mediumService.js
const MEDIUM_USERNAME = "@erenatasoy04";
const MEDIUM_RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${MEDIUM_USERNAME}`;
```

**Özellikler:**

- RSS2JSON API kullanır (ücretsiz)
- HTML'den plain text çıkarır
- Okuma süresi hesaplar
- Thumbnail image çıkarır

## 🚀 Kullanım

### Projects Component

```javascript
import { fetchGitHubRepos } from "../services/githubService";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const repos = await fetchGitHubRepos();
      setProjects(repos);
    };
    loadProjects();
  }, []);

  // ...
};
```

### Blog Component

```javascript
import { fetchMediumArticles } from "../services/mediumService";

const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const posts = await fetchMediumArticles();
      setArticles(posts);
    };
    loadArticles();
  }, []);

  // ...
};
```

## 🎨 UI Özellikleri

### Project Cards

- **Hover efekti**: Scale ve overlay
- **Featured badge**: İlk 3 repo
- **Stars badge**: Yıldız sayısı
- **Teknoloji pill'leri**: Kullanılan teknolojiler
- **Tıklanabilir**: GitHub'a yönlendirir

### Blog Cards

- **Thumbnail**: Medium'dan çekilen görsel
- **Featured badge**: İlk 2 makale
- **Tags**: Makale etiketleri
- **Meta info**: Tarih ve okuma süresi
- **Tıklanabilir**: Medium'a yönlendirir

## ⚡ Performance

### Loading States

- Spinner animasyonu
- "Loading from GitHub/Medium..." mesajı
- Smooth transition

### Error Handling

- Try-catch blokları
- Error state gösterimi
- "Try Again" butonu
- Console error logging

### Caching

- Component state'te cache
- Sayfa yenilenene kadar cache
- Re-fetch için "Try Again" butonu

## 🔄 Güncelleme

### Kullanıcı Adını Değiştirme

**GitHub:**

```javascript
// src/services/githubService.js
const GITHUB_USERNAME = "YourUsername"; // Burası değiştir
```

**Medium:**

```javascript
// src/services/mediumService.js
const MEDIUM_USERNAME = "@yourusername"; // Burası değiştir
```

### Filtreleme

**Projects:**

- All: Tüm repo'lar
- Featured: İlk 3 repo
- Teknoloji: Belirli teknoloji içeren repo'lar

**Blog:**

- Featured: İlk 2 makale
- Recent: Diğer makaleler

## 🐛 Troubleshooting

### GitHub API Rate Limit

**Problem:** 60 request/saat limiti
**Çözüm:** Personal Access Token kullan (optional)

### Medium RSS Gecikme

**Problem:** RSS feed güncellenmesi zaman alabilir
**Çözüm:** Normal, Medium'un cache'i

### CORS Hatası

**Problem:** Browser CORS policy
**Çözüm:** RSS2JSON API kullanıyoruz (CORS-free)

## 📊 Data Format

### GitHub Repository Object

```javascript
{
  id: 123456,
  title: "Project Name",
  description: "Project description",
  image: "https://opengraph.githubassets.com/...",
  technologies: ["React", "Node.js"],
  githubUrl: "https://github.com/user/repo",
  liveUrl: "https://demo.com",
  featured: true,
  stars: 10,
  language: "JavaScript",
  updatedAt: "2024-01-01"
}
```

### Medium Article Object

```javascript
{
  id: "unique-id",
  title: "Article Title",
  excerpt: "Article excerpt...",
  date: "2024-01-01",
  readTime: "5 min read",
  tags: ["React", "JavaScript"],
  url: "https://medium.com/@user/article",
  thumbnail: "https://image-url.jpg",
  featured: true
}
```

## 🎯 Sonuç

Artık portfolio siteniz:

- ✅ GitHub'dan otomatik repo çekiyor
- ✅ Medium'dan otomatik makale çekiyor
- ✅ Kartlar tıklanabilir ve yönlendiriyor
- ✅ Loading ve error state'leri var
- ✅ Apple tarzı minimalist tasarım
- ✅ Responsive ve performanslı

**Not:** İlk yüklemede API'lerden veri çekilir, bu 1-2 saniye sürebilir.
