<template>
  <div class="container ">
    <h1>ZNO<sup>2</sup></h1>
    <hr>
    <div v-if="!testing">
      <p>Цей сервіс розроблено для перевірки знання формул з математики, що використовується в задачах по програмі ЗНО.</p>
      <p>Ви можете обрати теми, по яким проводити опитування</p>
      <p>Вам буде показано текстовий опис (призначення) формули. Подумки згадайте формулу та натисніть на визначення щоб побачити її та порівняти з власним варіантом.</p>
      <small class="text-muted" v-if="!testing">Всього для опитування доступно формул: {{ avaliableQuestionsCount }}</small>
    </div>
    <br>
    <div class="card">
      <b-button-group v-if="!testing">
        <b-button variant="success" @click="startQuiz()">
          Розпочати тестування
        </b-button>
        <b-button variant="primary" v-b-modal.categoriesModal>
          Обрати теми
        </b-button>
      </b-button-group>
      <div class="card-body test-area" v-if="testing" @click="advance()">
        <small class="text-muted">{{questionsAnswered}} / {{totalQuestions}}</small>
        <br>
        <small class="text-muted">{{ allCategories[currentQuestion.category]}}</small>
        <blockquote class="blockquote">
          {{ currentQuestion.title }}
        </blockquote>
        <h3 v-html="questionFormulaHtml" v-if="showFormula"></h3>
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
      allCategories: Tests.categories
    }
  },
  methods: {
    startQuiz() {
      this.buildQuestionsList();

      this.testing = true;

      this.questionsAnswered = 1;
      this.questionsPointer = 0;
    },
    buildQuestionsList() {
      this.selectedCategories = ['vectors'];
      Tests.tests.forEach((q) => {
        if (this.selectedCategories.includes(q.category)) this.questions.push(q);
      });

      this.totalQuestions = this.questions.length;
    },
    advance() {
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

      let newPtr = Math.floor(Math.random()*this.questions.length);

      this.questionsPointer = newPtr;
      this.questionsAnswered++;
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.questionsPointer];
    },
    questionFormulaHtml() {
      return window.katex.renderToString(this.currentQuestion.formula, {
        displayMode: false
      });
    }
  }
}
</script>

<style>
.container {
  text-align: center;
}

.test-area {
  cursor: pointer;
}
</style>


