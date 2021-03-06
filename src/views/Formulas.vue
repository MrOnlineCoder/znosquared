<template>
  <div class="container ">
    <h1>ZNO<sup>2</sup></h1>
    <hr>
    <div v-if="!testing">
      <p>Цей сервіс розроблено для перевірки знання формул з математики, що використовуються в задачах по програмі ЗНО.</p>
      <p>Ви можете обрати теми, по яким проводити опитування</p>
      <p>Вам буде показано текстовий опис (призначення) формули. Подумки згадайте формулу та натисніть на визначення щоб побачити її та порівняти з власним варіантом.</p>
      <small class="text-muted" v-if="!testing">Всього для опитування доступно формул: {{ avaliableQuestionsCount }}</small>
    </div>
    <br>
    <div class="card">
      <b-button-group v-if="!testing">
        <b-button variant="primary" v-b-modal.categoriesModal>
          Обрати теми
        </b-button>
        <b-button variant="success" @click="startQuiz()">
          Розпочати тестування
        </b-button>
        <b-button variant="warning" v-b-modal.optionsModal>
          Додаткові опції
        </b-button>
      </b-button-group>
      <div class="card-body test-area" v-if="testing" @click="advance(false)">
        <small class="text-muted">{{questionsAnswered}} / {{totalQuestions}}</small>
        <br>
        <small class="text-muted">{{ allCategories[currentQuestion.category]}}</small>
        <div class="formula">
          <blockquote class="blockquote">
            {{ currentQuestion.title }}
          </blockquote>
          <h3 v-html="questionFormulaHtml" v-show="showFormula"></h3>
        </div>
        <br>
        <b-button class="advanceButton" size="lg" variant="success" @click="advance(true)" v-if="options.advanceButton">
          {{ showFormula ? 'Продовжити' : 'Показати формулу'}}
        </b-button>
      </div>
    </div>
    <b-modal
      id="categoriesModal"
      title="Теми для тестування"
      ok-only
      ok-title="Готово"
      header-bg-variant="primary">
      <b-form-checkbox-group v-model="selectedCategories" stacked>
        <b-form-checkbox v-for="v,k in allCategories" :value="k">{{ v }}</b-form-checkbox>
      </b-form-checkbox-group>
    </b-modal>
     <b-modal
      id="optionsModal"
      title="Опції"
      ok-only
      ok-title="Готово"
      header-bg-variant="warning">
      <b-form-checkbox v-model="options.advanceButton">Окрема кнопка для переходу до наступного запитання</b-form-checkbox>
      <b-form-checkbox v-model="options.instantFormula">Одразу показувати формулу</b-form-checkbox>
      <b-form-checkbox v-model="options.displayMode">Збільшувати деякі символи (не рекомендується для телефонів)</b-form-checkbox>
    </b-modal>
  </div>
</template>

<script>
import Tests from '../assets/tests.json'

export default {
  data() {
    return {
      testing: false,

      questions: [],
      questionsAnswered: 0,
      questionsPointer: 0,
      totalQuestions: 0,
      selectedCategories: Object.keys(Tests.categories),
      avaliableQuestionsCount: Tests.tests.length,
      
      showFormula: false,
      allCategories: Tests.categories,

      options: {
        instantFormula: false,
        displayMode: false,
        advanceButton: false,
      }
    }
  },
  methods: {
    startQuiz() {
      this.buildQuestionsList();

      this.testing = true;

      this.questionsAnswered = 1;
      this.questionsPointer = 0;

      if (this.options.instantFormula) this.showFormula = true;
    },
    buildQuestionsList() {
      Tests.tests.forEach((q) => {
        if (this.selectedCategories.includes(q.category)) this.questions.push(q);
      });

      this.totalQuestions = this.questions.length;
    },
    advance(isButton) {
      if (this.options.advanceButton && !isButton) return;

      if (!this.showFormula) {
        this.showFormula = true;
        return;
      } else {
        this.nextQuestion();
      }
    },
    nextQuestion() {
      this.showFormula = false;
      this.questions.splice(this.questionsPointer, 1);

      if (this.questions.length == 0) {
        this.testing = false;
        return;
      }

      let newPtr = Math.floor(Math.random()*this.questions.length);

      this.questionsPointer = newPtr;
      this.questionsAnswered++;

      if (this.options.instantFormula) {
        this.showFormula = true;
      }
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.questionsPointer];
    },
    questionFormulaHtml() {
      return window.katex.renderToString(this.currentQuestion.formula, {
        displayMode: this.options.displayMode
      });
    }
  }
}
</script>

<style>
.container {
  text-align: center;
  min-height: 100%;
}

.test-area {
  cursor: pointer;
  display:block;
  height: 450px;
}

.formula {
  height: 250px;
  display: block;
}

@media only screen 
  and (min-width: 320px) {
  .katex { 
    font-size: 0.92em; 
  }
}

@media only screen 
  and (min-width: 375px) {
  .katex { 
    font-size: 1em; 
  }
}

@media only screen 
  and (min-width: 400px) {
  .katex { 
    font-size: 1.1em; 
  }
}
</style>


