class CalorieTracker {
  constructor() {
    this._calorieLimit = 2080;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  //  Public Mehtods/API
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private Methods //
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');

    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');

    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloreisRemainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress');

    const remaining = this._calorieLimit - this._totalCalories;

    caloreisRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloreisRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloreisRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressEl.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
    } else {
      caloreisRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloreisRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this.tracker = new CalorieTracker();

    document
    .getElementById('meal-form')
    .addEventListener('submit', this._newItem.bind(this, 'meal'))

    document
    .getElementById('workout-form')
    .addEventListener('submit', this._newItem.bind(this, 'workout'))
   };

    _newItem(type, e) {
      e.preventDefault();

      const name = document.getElementById(`${type}-name`);
      const calories = document.getElementById(`${type}-calories`);

      // Validate inputs 
      if (name.value === '' || calories.value === '') {
        alert('Please fill in all fields')
        return;
      }

      if (type === 'meal') {
        const meal = new Meal(name.value, +calories.value);
        this.tracker.addMeal(meal);
      }

       if (type === 'workout') {
        const workout = new Workout(name.value, +calories.value);
        this.tracker.addWorkout(workout);
      }

      name.value = '';
      calories.value = '';
      
      const collapseItem = document.getElementById(`collapse-${type}`);
      const bsCollapse = new bootstrap.Collapse(collapseItem, {
        toogle: true
      });
    };
}

const app = new App()
