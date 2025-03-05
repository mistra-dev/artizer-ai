export const prompts = {
    complete: {
        id: `Anda adalah seorang analis berita profesional. Tolong analisis artikel berikut dengan sangat mendetail dan berikan:

        1. METADATA ARTIKEL
        - Identifikasi judul artikel
        - Identifikasi penulis/jurnalis
        - Identifikasi tanggal publikasi
        - Identifikasi sumber berita

        2. RINGKASAN EKSEKUTIF (3-4 kalimat)
        3. ANALISIS MENDALAM
        4. KONTEKS DAN LATAR BELAKANG
        6. ANALISIS KRITIS
        7. REKOMENDASI`,
        
        en: `As a professional news analyst, please analyze the following article in detail and provide:

        1. ARTICLE METADATA
        - Article title
        - Author/journalist
        - Publication date
        - News source

        2. EXECUTIVE SUMMARY (3-4 sentences)
        3. IN-DEPTH ANALYSIS
        4. CONTEXT AND BACKGROUND
        5. IMPLICATIONS AND IMPACT
        6. CRITICAL ANALYSIS
        7. RECOMMENDATIONS`
    },
    summary: {
        id: `Berikan ringkasan singkat dan padat dari artikel berita ini dalam 3-4 paragraf.`,
        en: `Provide a brief and concise summary of this news article in 3-4 paragraphs.`
    },
    advanced: {
        id: `Lakukan analisis mendalam terhadap artikel ini dengan fokus pada:
        1. Analisis kontekstual
        2. Implikasi sosial-ekonomi
        3. Dampak jangka panjang
        4. Perspektif berbagai pemangku kepentingan
        5. Rekomendasi strategis`,
        
        en: `Perform an in-depth analysis of this article focusing on:
        1. Contextual analysis
        2. Socio-economic implications
        3. Long-term impact
        4. Stakeholder perspectives
        5. Strategic recommendations`
    }
}; 