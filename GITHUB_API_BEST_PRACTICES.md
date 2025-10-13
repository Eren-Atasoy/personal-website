# 🔧 GitHub API Best Practices Implementation

## ✅ Uygulanan GitHub Dokümantasyon Kuralları

Bu proje, [GitHub REST API Rate Limiting](https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting) dokümantasyonuna göre yapılandırılmıştır.

---

## 📋 Uygulanan Özellikler

### 1. **Proper Headers (Zorunlu)**

```javascript
const headers = {
  Accept: "application/vnd.github.v3+json", // API version
  "User-Agent": "Portfolio-Website", // Required by GitHub
  "X-GitHub-Api-Version": "2022-11-28", // Explicit API version
};
```

**GitHub Kuralı:**

> All API requests MUST include a valid User-Agent header.

✅ **Uygulandı:** Her istekte `User-Agent` header'ı gönderiliyor.

---

### 2. **Authentication (Önerilen)**

```javascript
if (GITHUB_TOKEN) {
  headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
}
```

**Rate Limits:**

- ❌ **Token olmadan:** 60 requests/hour
- ✅ **Token ile:** 5,000 requests/hour

**GitHub Kuralı:**

> Authenticated requests get a higher rate limit.

✅ **Uygulandı:** Token varsa otomatik olarak kullanılıyor.

---

### 3. **Rate Limit Checking**

```javascript
export const checkRateLimit = async () => {
  const response = await fetch("https://api.github.com/rate_limit", {
    headers,
  });
  const data = await response.json();

  return {
    limit: data.rate.limit,
    remaining: data.rate.remaining,
    reset: data.rate.reset * 1000,
  };
};
```

**GitHub Kuralı:**

> Check your rate limit status at any time using the Rate Limit API.

✅ **Uygulandı:** Her istek öncesi rate limit kontrol ediliyor.

---

### 4. **Rate Limit Headers**

```javascript
// Response headers'dan rate limit bilgisi al
const rateLimitInfo = {
  limit: response.headers.get("X-RateLimit-Limit"),
  remaining: response.headers.get("X-RateLimit-Remaining"),
  reset: response.headers.get("X-RateLimit-Reset"),
};
```

**GitHub Headers:**

- `X-RateLimit-Limit`: Saatte izin verilen istek sayısı
- `X-RateLimit-Remaining`: Kalan istek sayısı
- `X-RateLimit-Reset`: Limitin sıfırlanacağı Unix timestamp

✅ **Uygulandı:** Her response'dan header bilgileri okunuyor.

---

### 5. **Graceful Degradation**

```javascript
if (rateLimit.remaining === 0) {
  console.warn(`Rate limit exceeded. Resets at: ${resetTime}`);
  throw new Error('RATE_LIMIT_EXCEEDED');
}

// Fallback to cached data
catch (error) {
  if (error.message === 'RATE_LIMIT_EXCEEDED') {
    return fallbackRepos; // Cached data
  }
}
```

**GitHub Kuralı:**

> If you exceed your rate limit, you will receive a 403 Forbidden response.

✅ **Uygulandı:** Rate limit aşıldığında fallback data kullanılıyor.

---

### 6. **Pagination Parameters**

```javascript
const url = new URL(GITHUB_API_URL);
url.searchParams.append("per_page", "100"); // Max repos per page
url.searchParams.append("sort", "updated"); // Sort by last updated
url.searchParams.append("direction", "desc"); // Newest first
```

**GitHub Kuralı:**

> Use pagination to reduce the number of requests.

✅ **Uygulandı:** Maksimum 100 repo tek seferde çekiliyor.

---

### 7. **Error Handling**

```javascript
if (response.status === 403) {
  const errorData = await response.json();
  if (errorData.message.includes("rate limit")) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }
}
```

**GitHub Error Codes:**

- `403 Forbidden`: Rate limit exceeded
- `401 Unauthorized`: Invalid token
- `404 Not Found`: Resource not found

✅ **Uygulandı:** Tüm error kodları handle ediliyor.

---

### 8. **Conditional Requests (İsteğe Bağlı)**

```javascript
// Future implementation: ETag caching
const headers = {
  "If-None-Match": cachedETag, // 304 Not Modified response
};
```

**GitHub Kuralı:**

> Use conditional requests to save your rate limit.

⏳ **Planlanan:** ETag caching gelecekte eklenebilir.

---

## 📊 Rate Limit Monitoring

### Console Logging

Her istekte detaylı bilgi:

```javascript
✅ GitHub API Success - Rate Limit: {
  limit: 5000,
  remaining: 4999,
  reset: 1697123456000,
  lastChecked: 1697120000000
}

⚠️ GitHub API rate limit exceeded. Using cached fallback data.
   Rate limit will reset at: 10/12/2024, 3:30:45 PM
   💡 Add REACT_APP_GITHUB_TOKEN to .env file to increase limit to 5000/hour
```

### UI Notification

Kullanıcıya gösterilen bilgi:

```
Rate Limit Info: Using cached repository data.
🕐 Resets: 10/12/2024, 3:30:45 PM
Remaining: 0/60
💡 Add token for 5000/hour limit
```

---

## 🔐 Security Best Practices

### 1. **Token Storage**

```bash
# ✅ DOĞRU: .env dosyasında
REACT_APP_GITHUB_TOKEN=ghp_xxxxx

# ❌ YANLIŞ: Kod içinde
const TOKEN = "ghp_xxxxx"; // ASLA YAPMAYIN!
```

### 2. **Token Scopes**

Minimum gerekli scope:

- ✅ `public_repo`: Public repository'ler için yeterli
- ❌ `repo`: Tüm repository'lere erişim (gereksiz)

### 3. **Token Rotation**

- 🔄 Token'ı 90 günde bir yenileyin
- 🔄 Şüpheli aktivite varsa hemen iptal edin
- 🔄 Asla token'ı paylaşmayın

---

## 📈 Performance Optimizations

### 1. **Caching Strategy**

```javascript
// Rate limit info cache
let rateLimitInfo = {
  limit: 60,
  remaining: 60,
  reset: Date.now(),
  lastChecked: null,
};
```

**Avantajlar:**

- Gereksiz API çağrılarını önler
- Hızlı rate limit kontrolü
- Memory-efficient

### 2. **Fallback Data**

```javascript
// Pre-defined repository data
export const fallbackRepos = [
  /* ... */
];
```

**Avantajlar:**

- Rate limit aşıldığında site çalışmaya devam eder
- Kullanıcı deneyimi kesintisiz
- Zero downtime

### 3. **Smart Pagination**

```javascript
per_page: 100; // Max allowed by GitHub
```

**Avantajlar:**

- Tek istekte maksimum veri
- Rate limit tasarrufu
- Daha hızlı yükleme

---

## 🧪 Testing

### Rate Limit Test

```bash
# Check current rate limit
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/rate_limit
```

**Expected Response:**

```json
{
  "rate": {
    "limit": 5000,
    "remaining": 4999,
    "reset": 1697123456,
    "used": 1
  }
}
```

### Token Validation

```bash
# Test token validity
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/user
```

---

## 📚 GitHub Documentation References

1. **Rate Limiting:**
   https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting

2. **Authentication:**
   https://docs.github.com/rest/overview/resources-in-the-rest-api#authentication

3. **Pagination:**
   https://docs.github.com/rest/guides/using-pagination-in-the-rest-api

4. **Conditional Requests:**
   https://docs.github.com/rest/overview/resources-in-the-rest-api#conditional-requests

5. **User-Agent Required:**
   https://docs.github.com/rest/overview/resources-in-the-rest-api#user-agent-required

---

## ✅ Compliance Checklist

- [x] User-Agent header included
- [x] API version specified
- [x] Authentication implemented (optional)
- [x] Rate limit checking before requests
- [x] Rate limit headers parsed
- [x] 403 error handling
- [x] Graceful degradation (fallback data)
- [x] Pagination parameters
- [x] Detailed error logging
- [x] User notification system
- [x] Token security (.env, .gitignore)
- [x] Console warnings for rate limits
- [ ] ETag caching (future enhancement)
- [ ] Retry logic with exponential backoff (future)

---

## 🎯 Summary

Bu proje, GitHub'ın tüm rate limiting kurallarına uygun şekilde yapılandırılmıştır:

1. ✅ **Proper Headers**: User-Agent, Accept, API Version
2. ✅ **Authentication**: Token support with Bearer scheme
3. ✅ **Rate Limit Checking**: Pre-request validation
4. ✅ **Header Parsing**: X-RateLimit-\* headers
5. ✅ **Error Handling**: 403, 401, 404 responses
6. ✅ **Fallback Strategy**: Cached data on failure
7. ✅ **User Notifications**: Clear rate limit info
8. ✅ **Security**: Token in .env, not in code

**Result:** Production-ready, GitHub API compliant implementation! 🚀
