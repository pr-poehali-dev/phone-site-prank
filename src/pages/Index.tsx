import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [showModal, setShowModal] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([100]);
  const [audioSrc, setAudioSrc] = useState('https://rus.hitmotop.com/get/music/20241214/Ston_prank_-_Ston_prank_78732798.mp3');
  const [customFileName, setCustomFileName] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const handleContinue = () => {
    setShowModal(false);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        setAudioSrc(url);
        setCustomFileName(file.name);
        if (audioRef.current) {
          audioRef.current.load();
        }
        setIsPlaying(false);
      } else {
        alert('Пожалуйста, выберите аудиофайл');
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      <audio 
        ref={audioRef} 
        src={audioSrc}
        preload="auto"
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
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
        <div className="max-w-md w-full animate-fade-in space-y-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-4xl font-bold mb-4">😈</h2>
            <h1 className="font-heading text-3xl font-bold mb-2">Пранк запущен!</h1>
            <p className="text-muted-foreground">Наслаждайтесь моментом</p>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Upload" size={18} />
                  Загрузить своё аудио
                </label>
                <Button
                  onClick={handleUploadClick}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Icon name="FileAudio" className="mr-2" size={20} />
                  {customFileName || 'Выбрать файл'}
                </Button>
                {customFileName && (
                  <p className="text-xs text-muted-foreground text-center">
                    Загружено: {customFileName}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={togglePlayPause}
                    size="lg"
                    className="w-full"
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} className="mr-2" size={20} />
                    {isPlaying ? 'Пауза' : 'Воспроизвести'}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Volume2" size={18} />
                    Громкость
                  </label>
                  <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <Button
            onClick={toggleAbout}
            variant="outline"
            className="w-full"
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
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-card-foreground">
                    Возможности
                  </h3>
                  <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                    <li>Загрузка собственного аудиофайла</li>
                    <li>Управление воспроизведением (пауза/воспроизведение)</li>
                    <li>Регулятор громкости</li>
                    <li>Автоматическое зацикливание аудио</li>
                  </ul>
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
