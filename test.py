import pygame
import math
import random

# Inicialização do Pygame
pygame.init()

# Configurações da tela
width, height = 800, 600
center = (width // 2, height // 2)
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Roleta de Pizza")

# Cores
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# Função para desenhar o pedaço da pizza
def draw_pizza_slice(surface, center, radius, start_angle, end_angle, color):
    points = [center]
    angle_step = math.pi / 180  # 1 grau em radianos
    for angle in range(start_angle, end_angle + 1):
        x = center[0] + radius * math.cos(angle * angle_step)
        y = center[1] + radius * math.sin(angle * angle_step)
        points.append((x, y))
    pygame.draw.polygon(surface, color, points)

# Função para desenhar a roleta de pizza
def draw_pizza_roulette(surface, center, radius, num_slices):
    slice_angle = 360 // num_slices
    colors = [RED, WHITE] * (num_slices // 2)  # Alternando cores
    for i in range(num_slices):
        start_angle = i * slice_angle
        end_angle = (i + 1) * slice_angle
        draw_pizza_slice(surface, center, radius, start_angle, end_angle, colors[i])
    pygame.draw.circle(surface, BLACK, center, radius, 2)  # Desenha a borda

# Função para girar a roleta
def spin_roulette():
    return random.randint(0, 35)

# Função principal
def main():
    num_slices = 36
    radius = 200
    spinning = False
    angle = 0

    while True:
        screen.fill(WHITE)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return
            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if not spinning:
                    spinning = True
                    angle = 0

        if spinning:
            angle += 10
            if angle >= 360:
                spinning = False
                angle = 0
                result = spin_roulette()
                print("Você ganhou o pedaço número:", result)
        else:
            result = -1

        draw_pizza_roulette(screen, center, radius, num_slices)
        pygame.draw.circle(screen, BLACK, center, 10)
        rotated_center = (center[0] + radius * math.cos(math.radians(angle)), center[1] + radius * math.sin(math.radians(angle)))
        pygame.draw.line(screen, BLACK, center, rotated_center, 2)

        pygame.display.flip()

if __name__ == "__main__":
    main()
