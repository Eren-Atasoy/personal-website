import React from 'react';
import { FileText, Users, Tag, ExternalLink, Download, BookOpen } from 'lucide-react';

const Article = () => {
  const handleOpenPDF = (e) => {
    try {
      e.preventDefault();
      // Public klasöründeki dosyalar root'tan erişilebilir
      const pdfUrl = '/article.pdf';
      console.log('Opening PDF:', window.location.origin + pdfUrl);
      
      // Direkt link kullan - popup blocker sorunlarını önler
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('PDF açılırken hata:', error);
      // Fallback: window.open dene
      window.open('/article.pdf', '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownloadPDF = () => {
    try {
      // Public klasöründeki dosyalar root'tan erişilebilir
      const pdfUrl = '/article.pdf';
      console.log('Downloading PDF:', window.location.origin + pdfUrl);
      
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'ErenAtasoy_AhmetEminGönültaş_YapayZekaMakale_TR.pdf';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      // Temizle
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
    } catch (error) {
      console.error('PDF indirilirken hata:', error);
      alert('PDF indirilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Makine Öğrenmesi ve Derin Öğrenme ile Kısa Vadeli Hisse Senedi Yön Tahmini
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Çoklu Sınıflandırma Yaklaşımı
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleOpenPDF}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <ExternalLink size={20} />
              Kaynağa Git
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Download size={20} />
              PDF İndir
            </button>
          </div>
        </div>

        {/* Article Information */}
        <div className="space-y-6">
          {/* Authors */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Yazarlar</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Eren Atasoy</span> - Yazılım Mühendisliği Bölümü, İstanbul Beykent Üniversitesi
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Ahmet Emin Gönültaş</span> - Yazılım Mühendisliği Bölümü, İstanbul Beykent Üniversitesi
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Gülay Çiçek</span> - İstanbul Beykent Üniversitesi
              </p>
            </div>
          </div>

          {/* Abstract */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Özet</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Finansal piyasaların hızlı, karmaşık ve öngörülemez doğası, yatırımcıların ve analistlerin doğru kararlar almasını zorlaştırmaktadır. 
              Bu nedenle, gelişmiş Makine Öğrenmesi (ML) ve Derin Öğrenme (DL) tekniklerinden yararlanarak hisse senedi yön tahmini yapabilen 
              akıllı sistemlere olan ihtiyaç giderek artmaktadır. Bu bağlamda, çalışmada Borsa İstanbul (BIST100) verileri temel alınarak finansal 
              piyasalardaki dalgalanmaların öngörülmesi amaçlanmıştır.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Kullanılan veri seti, Yahoo Finance ve Kaggle platformlarından elde edilmiş olup, 4.587 satır ve 42 sütundan oluşmaktadır. 
              Çalışmada, veriye ön işleme adımları uygulanmış olup, eksik veri temizleme, Min-Max normalizasyonu ve IQR (çeyrekler arası açıklık) 
              yöntemi ile aykırı değerlerin işlenmesi gerçekleştirilmiştir. Öznitelik seçiminde Temel Bileşen Analizi (PCA) ve Lineer Ayrıştırıcı 
              Analiz (LDA) kullanılarak, verinin boyutu azaltılmış ve önemli özniteliklerin belirlenmesi sağlanmıştır.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Sınıflandırma algoritmaları olarak K-En Yakın Komşu (KNN), Rastgele Orman (Random Forest), XGBoost, Extra Trees, 
              Destek Vektör Makineleri (SVM), Uzun Kısa Süreli Bellek (LSTM), Çift Yönlü LSTM (Bi-LSTM), Konvolüsyonel Sinir Ağı (CNN), 
              Gated Recurrent Unit (GRU) ve Tekrarlayan Sinir Ağı (RNN) kullanılmıştır. Ayrıca, bu çalışmada daha önce literatürde kullanılmamış 
              özgün bir hibrit model önerilmiştir.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Modelin performansı doğruluk, F1-skoru, özgüllük, duyarlılık, AUC-ROC ve kesinlik gibi değerlendirme kriterleriyle ölçülmüş, 
              5 katlı çapraz doğrulama (K-Fold, k=5) yöntemi ile modelin genelleme yeteneği test edilmiştir. Yapılan analizler sonucunda, 
              önerilen hibrit modelin ve çoklu sınıflandırma yaklaşımının diğer yöntemlere kıyasla daha yüksek doğruluk oranı sağladığı gözlemlenmiştir.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Çalışma, yatırımcılara "al", "tut" ve "sat" önerileri sunarak karar alma süreçlerine katkı sağlamayı hedeflemektedir. 
              En önemli katkısı, finansal piyasalarda daha önce kullanılmamış bir hibrit modelin geliştirilmesi ve çoklu sınıflandırma 
              yaklaşımının uygulanmasıdır.
            </p>
          </div>

          {/* Keywords */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Anahtar Kelimeler</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Hisse senedi yön tahmini',
                'Makine Öğrenmesi',
                'Derin Öğrenme',
                'LSTM',
                'Extra Trees',
                'Çoklu Sınıflandırma',
                'BIST100'
              ].map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kullanılan Yöntemler</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Makine Öğrenmesi Algoritmaları</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• K-En Yakın Komşu (KNN)</li>
                  <li>• Rastgele Orman (Random Forest)</li>
                  <li>• XGBoost</li>
                  <li>• Extra Trees</li>
                  <li>• Destek Vektör Makineleri (SVM)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Derin Öğrenme Modelleri</h3>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• LSTM (Uzun Kısa Süreli Bellek)</li>
                  <li>• Bi-LSTM (Çift Yönlü LSTM)</li>
                  <li>• CNN (Konvolüsyonel Sinir Ağı)</li>
                  <li>• GRU (Gated Recurrent Unit)</li>
                  <li>• RNN (Tekrarlayan Sinir Ağı)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ön İşleme ve Öznitelik Seçimi</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Min-Max Normalizasyonu</li>
                <li>• IQR Yöntemi ile Aykırı Değer İşleme</li>
                <li>• Temel Bileşen Analizi (PCA)</li>
                <li>• Lineer Ayrıştırıcı Analiz (LDA)</li>
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Değerlendirme Metrikleri</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                'Doğruluk (Accuracy)',
                'F1-Skoru',
                'Özgüllük (Specificity)',
                'Duyarlılık (Sensitivity)',
                'AUC-ROC',
                'Kesinlik (Precision)'
              ].map((metric, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center"
                >
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{metric}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Model performansı 5 katlı çapraz doğrulama (K-Fold, k=5) yöntemi ile test edilmiştir.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Makaleyi Detaylı İncelemek İster misiniz?</h2>
            <p className="text-blue-100 mb-6">
              Tam makaleyi PDF formatında görüntülemek veya indirmek için aşağıdaki butonları kullanabilirsiniz.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleOpenPDF}
                className="flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                <ExternalLink size={20} />
                PDF'i Yeni Sekmede Aç
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-8 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-200 shadow-lg"
              >
                <Download size={20} />
                PDF'i İndir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
