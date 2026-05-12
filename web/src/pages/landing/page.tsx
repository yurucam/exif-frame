import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-ios selection:bg-brand-red selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 flex justify-between items-center p-6 bg-black/50 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold tracking-tighter">EXIF <span className="text-red-500">Frame</span></h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <button onClick={() => navigate('/app')} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform">
            Launch App
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 relative">
        {/* Abstract background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/30 rounded-full blur-3xl mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 relative z-10"
        >
          Your Photos.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Cinematic Glory.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 relative z-10"
        >
          Add elegant frames, expose your metadata, and apply professional cinema-grade LUTs and edits directly in your browser or on your phone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative z-10 flex gap-4"
        >
          <button onClick={() => navigate('/app')} className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/50">
            Start Creating
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-20 text-center"
        >
          Professional Tools. <br/><span className="text-gray-500">Pocket Sized.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Photo & Video Capture', desc: 'Capture directly from your environment with advanced metadata support.' },
            { title: 'Cinema Grade Edits', desc: 'Apply blockbuster LUTs, anamorphic de-squeeze, and false color simulations.' },
            { title: 'Beautiful Frames', desc: 'Dozens of premium templates to showcase your EXIF data elegantly.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl hover:bg-gray-800/50 transition-colors backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 text-center border-t border-gray-900">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-black mb-8"
        >
          Ready to re-frame?
        </motion.h2>
        <button onClick={() => navigate('/app')} className="bg-white text-black px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform">
          Open Web App
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
