interface Logger {
    log(message: string): void;
}

class LogToConsole implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

class Position {
    constructor(public x: number, public y: number) {}
}

enum LineColor {
    Black = "Black",
    Red = "Red",
    Green = "Green",
}

class Plotter {
    private position: Position = new Position(0, 0);
    private color: LineColor = LineColor.Black;
    private isCarriageDown: boolean = false;
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    setColor(color: LineColor): void {
        this.color = color;
        this.logger.log(`Устанавливаем ${color} цвет линии.`);
    }

    carriageDown(): void {
        this.isCarriageDown = true;
        this.logger.log("Опускаем каретку.");
    }

    carriageUp(): void {
        this.isCarriageDown = false;
        this.logger.log("Поднимаем каретку.");
    }

    move(distance: number): void {
        const newPosition = this.calcNewPosition(distance, 0, this.position);
        if (this.isCarriageDown) {
            this.logger.log(`Чертим линию из (${this.position.x}, ${this.position.y}) в (${newPosition.x}, ${newPosition.y}) используя ${this.color} цвет.`);
        }
        this.position = newPosition;
    }

    turn(angle: number): void {
        this.logger.log(`Поворачиваем на ${angle} градусов.`);
    }

    private calcNewPosition(distance: number, angle: number, current: Position): Position {
        const angle_in_rads = angle * (Math.PI / 180.0);
        const x = current.x + distance * Math.cos(angle_in_rads);
        const y = current.y + distance * Math.sin(angle_in_rads);
        return new Position(Math.round(x), Math.round(y));
    }
}

function drawTriangle(plt: Plotter, size: number): void {
    plt.setColor(LineColor.Green);
    for (let i = 0; i < 3; ++i) {
        plt.carriageDown();
        plt.move(size);
        plt.carriageUp();
        plt.turn(120.0);
    }
}

const plotter = new Plotter(new LogToConsole());
drawTriangle(plotter, 100.0);
