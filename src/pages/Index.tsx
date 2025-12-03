import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [showModal, setShowModal] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleContinue = () => {
    setShowModal(false);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      <audio 
        ref={audioRef} 
        src="https://rus.hitmotop.com/get/music/20241214/Ston_prank_-_Ston_prank_78732798.mp3"
        preload="auto"
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-sm p-8 text-center shadow-2xl animate-scale-in">
            <h1 className="font-heading text-2xl font-bold text-card-foreground mb-6">
              Добро пожаловать
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Если хотите посетить наш сайт, напишите продолжить
            </p>
            <Button 
              onClick={handleContinue}
              className="w-full font-semibold"
              size="lg"
            >
              Продолжить
            </Button>
          </Card>
        </div>
      )}

      {!showModal && (
        <div className="max-w-md w-full animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="font-heading text-4xl font-bold mb-4">😈</h2>
            <h1 className="font-heading text-3xl font-bold mb-2">Пранк запущен!</h1>
            <p className="text-muted-foreground">Наслаждайтесь моментом</p>
          </div>

          <Button
            onClick={toggleAbout}
            variant="outline"
            className="w-full mb-4"
            size="lg"
          >
            <Icon name={showAbout ? "ChevronUp" : "ChevronDown"} className="mr-2" size={20} />
            О пранке
          </Button>

          {showAbout && (
            <Card className="p-6 animate-scale-in">
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-card-foreground">
                    Создатель
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Этот пранк создан для развлечения и безобидных шуток с друзьями. 
                    Используйте с осторожностью и помните о чувстве юмора окружающих!
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-card-foreground">
                    Как работает?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    После нажатия кнопки "Продолжить" автоматически запускается 
                    аудиозапись. Идеально для розыгрышей в компании!
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-center text-muted-foreground">
                    Сделано с юмором и любовью 💜
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
