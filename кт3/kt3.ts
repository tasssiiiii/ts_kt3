interface Logger {
    log(message: string): void;
  }
  
  class Plotter {
    private logger: Logger;
  
    constructor(logger: Logger) {
      this.logger = logger;
    }
  
    move(distance: number): void {
      this.logger.log(`Перемещаемся на расстояние ${distance}`);
    }
  
    turn(degrees: number): void {
      this.logger.log(`Поворачиваем на ${degrees} градусов`);
    }
  
    carriageDown(): void {
      this.logger.log('Опускаем каретку');
    }
  
    carriageUp(): void {
      this.logger.log('Поднимаем каретку');
    }
  
    setColor(color: string): void {
      this.logger.log(`Устанавливаем ${color} цвет линии`);
    }
  }
  
  class LogToConsole implements Logger {
    log(message: string): void {
      console.log(message);
    }
  }
  
  function drawTriangle(plt: Plotter, size: number): void {
    plt.setColor('зелёный');
    for (let i = 0; i < 3; ++i) {
      plt.carriageDown();
      plt.move(size);
      plt.carriageUp();
      plt.turn(120.0);
    }
  }
  
  const plotter = new Plotter(new LogToConsole());
  drawTriangle(plotter, 100.0);