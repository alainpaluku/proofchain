import React, { useState, useEffect } from 'react';
import { AlertTriangle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

const crisisImages = [
    { url: 'https://www.hrw.org/sites/default/files/styles/16x9_large/public/multimedia_images_2015/drcschools1015_reportcovermainr.jpg?itok=5AeXxSrb', key: 'schools' },
    { url: 'https://img.msf.org/AssetLink/6438mu458es74ym450tt22n4wni2647m.jpg', key: 'conflict' },
    { url: 'https://s.rfi.fr/media/display/6a5bfca0-e859-11ef-b717-005056a90284/w:1024/p:16x9/IMG_20250210_105821.jpg', key: 'situation' },
];

export function ProblemSection() {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % crisisImages.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-6">
                            <AlertTriangle className="w-4 h-4" />
                            {t('landing', 'theProblem')}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            {t('landing', 'contextTitle')}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
                            {t('landing', 'contextDesc')}
                        </p>
                    </div>

                    {/* Crisis Carousel */}
                    <div className="relative max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl">
                        <div className="relative aspect-video">
                            {crisisImages.map((img, i) => (
                                <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                    <img src={img.url} alt="Crisis" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                                            <AlertTriangle className="w-5 h-5" />
                                            <span className="font-medium">{t('landing', 'educationCrisis')}</span>
                                        </div>
                                        <p className="text-white">{t('landing', 'educationCrisis')}</p> 
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setCurrentSlide((p) => (p - 1 + crisisImages.length) % crisisImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={() => setCurrentSlide((p) => (p + 1) % crisisImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            {crisisImages.map((_, i) => (
                                <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Challenges */}
                    <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-100 dark:border-red-900/30">
                        <h3 className="text-xl font-bold mb-6 text-center">{t('landing', 'challengesTitle')}</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: t('landing', 'schoolsDestroyed'), desc: t('landing', 'schoolsDestroyedDesc') },
                                { title: t('landing', 'documentsLost'), desc: t('landing', 'documentsLostDesc') },
                                { title: t('landing', 'forgery'), desc: t('landing', 'forgeryDesc') },
                                { title: t('landing', 'impossibleReconstruction'), desc: t('landing', 'impossibleReconstructionDesc') }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <X className="w-5 h-5 text-red-500" />
                                    </div>
                                    <h4 className="font-semibold mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
