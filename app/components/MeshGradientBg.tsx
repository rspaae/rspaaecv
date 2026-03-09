'use client';

export default function MeshGradientBg() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            <div
                className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)',
                    animation: 'meshFloat1 12s ease-in-out infinite alternate',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            />
            <div
                className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, rgba(255,0,229,0.4) 0%, transparent 70%)',
                    animation: 'meshFloat2 15s ease-in-out infinite alternate',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
                    animation: 'meshFloat3 18s ease-in-out infinite alternate',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            />
        </div>
    );
}
