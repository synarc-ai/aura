# Минимальная Жизнеспособная AURA (MVA)

## Цель Документа
Определить абсолютный минимум функциональности для валидации ключевых гипотез AURA за 1-2 недели разработки силами 1-2 инженеров.

## Ключевая Гипотеза для Валидации

**Многомасштабная иерархия с разными временными константами может эффективно переключаться между быстрыми эвристиками и медленным исчерпывающим поиском, превосходя монолитные архитектуры на задачах с переменной сложностью.**

## Минимальный Прототип: ~1000 строк кода

### 1. Упрощённая Архитектура

```typescript
// Всего 3 уровня вместо N
interface MinimalHierarchy {
  fast: FastReactiveLayer;      // τ = 10ms
  medium: TacticalLayer;         // τ = 100ms
  slow: StrategicLayer;          // τ = 1000ms
}

// Всего 100 агентов вместо миллиардов
const AGENTS_PER_LAYER = 30;

// Фиксированные правила вместо эволюции
type AgentBehavior = 'reactive' | 'deliberative' | 'exploratory';
```

### 2. Минимальный Набор Компонентов

#### Core (300 строк)
```typescript
// agent.ts - 50 строк
class MinimalAgent {
  id: string;
  state: Float32Array; // 16 измерений вместо 1000+
  timeConstant: number;

  act(input: Float32Array): Float32Array {
    // Простая линейная трансформация + ReLU
    return relu(matmul(this.weights, input));
  }
}

// hierarchy.ts - 100 строк
class MinimalHierarchy {
  layers: Layer[];

  step(observation: Observation): Action {
    // Параллельная обработка на каждом уровне
    const layerOutputs = this.layers.map(l => l.process(observation));

    // Простое голосование вместо сложного консенсуса
    return this.combineVotes(layerOutputs);
  }
}

// resonance.ts - 150 строк
class SimpleResonance {
  findResonance(pattern: Float32Array, agents: Agent[]): number[] {
    // Косинусное сходство вместо квантового резонанса
    return agents
      .map(a => cosineSimilarity(pattern, a.state))
      .filter(sim => sim > THRESHOLD);
  }
}
```

#### Оптимизация (200 строк)
```typescript
// optimizer.ts
class SimpleEvolution {
  // Только мутация, без кроссовера
  mutate(agent: Agent): Agent {
    const newAgent = clone(agent);
    // Гауссовский шум к весам
    addGaussianNoise(newAgent.weights, 0.01);
    return newAgent;
  }

  // Простая элитная селекция
  select(population: Agent[], scores: number[]): Agent[] {
    return population
      .sort((a, b) => scores[b.id] - scores[a.id])
      .slice(0, population.length / 2);
  }
}
```

#### Задачи для Валидации (300 строк)
```typescript
// tasks.ts
interface ValidationTask {
  name: string;
  generate(): Problem;
  evaluate(solution: Solution): number;
}

class VariableComplexityTask implements ValidationTask {
  // Задача с переключением между режимами
  generate(): Problem {
    const difficulty = Math.random();
    if (difficulty < 0.7) {
      // Простая задача - должна решаться быстрым уровнем
      return this.generateSimplePattern();
    } else if (difficulty < 0.95) {
      // Средняя - требует тактического уровня
      return this.generateSequentialProblem();
    } else {
      // Сложная - требует стратегического планирования
      return this.generateCombinatorialProblem();
    }
  }
}
```

#### Метрики (200 строк)
```typescript
// metrics.ts
class PerformanceMonitor {
  measureLatency(layer: Layer): number;
  measureAccuracy(predictions: any[], ground_truth: any[]): number;
  measureResourceUsage(): { cpu: number; memory: number };

  // Ключевая метрика: эффективность переключения режимов
  measureModeSwitch(): {
    correctSwitches: number;
    unnecessaryDeliberation: number;
    missedOpportunities: number;
  };
}
```

### 3. Критические Упрощения

#### Что УБИРАЕМ полностью:
- ❌ Квантовые вычисления → классические аппроксимации
- ❌ Теория категорий → простые типы TypeScript
- ❌ Распределённость → single-process
- ❌ GPU ускорение → чистый CPU
- ❌ Сложная математика → базовая линейная алгебра
- ❌ Символическая интеграция → только векторы
- ❌ Долговременная память → только рабочая память
- ❌ Обучение с подкреплением → простая эволюция

#### Что ОСТАВЛЯЕМ (ядро идеи):
- ✅ 3-уровневая иерархия с разными τ
- ✅ Параллельная обработка внутри уровня
- ✅ Переключение быстрый/медленный режим
- ✅ Базовая эволюция правил
- ✅ Измерение trade-off скорость/качество

### 4. Эталонные Задачи

#### Задача 1: Сортировка с Переменным Размером
```typescript
// Маленькие массивы (n < 10) - быстрая эвристика
// Средние (10 < n < 100) - оптимизированный quicksort
// Большие (n > 100) - параллельный mergesort

// MVA должна автоматически выбирать стратегию
// Baseline: if-else с жёстким порогом
```

#### Задача 2: Поиск Пути с Препятствиями
```typescript
// Простые лабиринты - жадный поиск
// Сложные - A*
// Динамические препятствия - перепланирование

// MVA должна адаптироваться к сложности
// Baseline: всегда A*
```

#### Задача 3: Распознавание Паттернов
```typescript
// Линейно разделимые - быстрый персептрон
// Нелинейные - медленная нейросеть
// Зашумлённые - ансамбль

// MVA должна выбирать модель по сложности
// Baseline: всегда нейросеть
```

### 5. Критерии Успеха

#### Количественные
- **Latency**: На простых задачах в 5-10x быстрее baseline
- **Accuracy**: На сложных задачах не хуже baseline (±2%)
- **Efficiency**: Среднее время/качество лучше на 20%+
- **Adaptability**: Правильный выбор режима в 80%+ случаев

#### Качественные
- Видимое переключение между режимами
- Эмерджентная специализация уровней
- Устойчивость к изменению распределения задач

### 6. План Разработки (10 дней)

#### День 1-2: Базовая Инфраструктура
```bash
npm init
npm install --save-dev typescript jest @types/node

# Структура
src/
  core/
    agent.ts
    layer.ts
    hierarchy.ts
  tasks/
    sorting.ts
    pathfinding.ts
  metrics/
    monitor.ts
  main.ts
```

#### День 3-4: Минимальная Иерархия
- Реализация 3-уровневой системы
- Простое голосование между уровнями
- Базовые агенты с линейными весами

#### День 5-6: Задачи и Метрики
- 3 эталонные задачи
- Система измерения производительности
- Baseline алгоритмы для сравнения

#### День 7-8: Эволюционная Оптимизация
- Простые мутации
- Элитная селекция
- Адаптация временных констант

#### День 9-10: Эксперименты и Анализ
- Прогон на всех задачах
- Сбор метрик
- Визуализация результатов
- Go/No-Go решение

### 7. Код Запуска

```typescript
// main.ts
async function validateMVA() {
  const hierarchy = new MinimalHierarchy({
    levels: 3,
    agentsPerLevel: 30,
    timeConstants: [10, 100, 1000] // ms
  });

  const tasks = [
    new VariableSortingTask(),
    new AdaptivePathfinding(),
    new PatternRecognition()
  ];

  const monitor = new PerformanceMonitor();

  for (const task of tasks) {
    console.log(`Testing: ${task.name}`);

    // 100 эпизодов
    for (let i = 0; i < 100; i++) {
      const problem = task.generate();
      const start = performance.now();

      const solution = hierarchy.solve(problem);

      const time = performance.now() - start;
      const score = task.evaluate(solution);

      monitor.record({ time, score, problem });
    }

    // Сравнение с baseline
    const mvaStats = monitor.getStats('mva');
    const baselineStats = await runBaseline(task);

    console.log('MVA:', mvaStats);
    console.log('Baseline:', baselineStats);
    console.log('Improvement:', calculateImprovement(mvaStats, baselineStats));
  }
}

// Запуск
validateMVA().then(results => {
  if (results.improvement > 0.2) {
    console.log('✅ MVA VALIDATED - Proceed to full implementation');
  } else {
    console.log('❌ MVA FAILED - Rethink approach');
  }
});
```

### 8. Ожидаемые Результаты

#### При Успехе
```
Task: Variable Sorting
  Simple (n<10):   MVA: 0.5ms,  Baseline: 2ms    [4x faster]
  Medium (n~50):   MVA: 8ms,    Baseline: 10ms   [similar]
  Complex (n>100): MVA: 45ms,   Baseline: 40ms   [similar]
  Overall:         MVA wins by 25% on average

Task: Pathfinding
  Open field:      MVA: 1ms,    Baseline: 5ms    [5x faster]
  Maze:            MVA: 15ms,   Baseline: 15ms   [similar]
  Dynamic:         MVA: 30ms,   Baseline: 50ms   [1.6x faster]
  Overall:         MVA wins by 40% on average
```

#### При Провале
```
If MVA shows no advantage:
1. Overhead слишком большой → упростить ещё больше
2. Неправильные τ → автоматическая подстройка
3. Задачи не подходят → найти tasks с большей вариативностью
```

### 9. Переход к Полной Версии

После успешной валидации MVA:

1. **Масштабирование** (Месяц 1)
   - 3 уровня → 7 уровней
   - 100 агентов → 10,000 агентов
   - Single-thread → Multi-thread

2. **Усложнение** (Месяц 2)
   - Линейные агенты → Нейронные
   - Простое голосование → Консенсус
   - Фиксированные правила → Обучение

3. **Оптимизация** (Месяц 3)
   - TypeScript → Rust для критических путей
   - CPU → GPU для параллелизма
   - In-memory → Распределённая

### 10. Риски и Митигации

| Риск | Вероятность | Митигация |
|------|------------|-----------|
| Overhead иерархии съедает выигрыш | Высокая | Начать с 2 уровней вместо 3 |
| Сложность отладки многоуровневой системы | Средняя | Подробное логирование, визуализация |
| Неправильный выбор задач для валидации | Средняя | А/B тесты с разными task suites |
| Эмерджентность не проявляется | Низкая | Явная инициализация специализации |

## Заключение

MVA фокусируется на единственной ключевой идее: **адаптивное переключение между быстрыми и медленными режимами решения**. Всё остальное безжалостно упрощено или удалено.

Если эта базовая идея работает - можно наращивать сложность. Если нет - проект требует фундаментального переосмысления, и мы узнаем это за 10 дней, а не за 10 месяцев.

**Девиз MVA: "Fail Fast or Scale Fast"**