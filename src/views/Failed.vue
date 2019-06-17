<template>
  <VContainer grid-list-md box>
    <VLayout wrap>
      <VFlex xs12 text-xs-center display-2 font-weight-light>Alunos</VFlex>
      <VFlex xs12>
        <VDataTable
          :headers="headers"
          :items="studentPerSubject"
          :rows-per-page-items="[
            10,
            20,
            30,
            {
              text: '$vuetify.dataIterator.rowsPerPageAll',
              value: -1
            }
          ]"
        >
          <template v-slot:items="props">
            <td>
              <span v-if="props.item.name && props.item.name.firstName">
                {{ props.item.name.firstName }}
              </span>
              <span v-if="props.item.name && props.item.name.lastName">
                {{ props.item.name.lastName }}
              </span>
            </td>
            <td>
              <span v-if="props.item.currentSemester">
                {{ props.item.currentSemester }}
              </span>
            </td>
            <td>
              <span
                v-if="
                  props.item.schoolSubject && props.item.schoolSubject.title
                "
              >
                {{ props.item.schoolSubject.title }}
              </span>
            </td>
            <td
              v-if="
                props.item.schoolSubject && props.item.schoolSubject.average
              "
            >
              <span>
                {{
                  (
                    Math.round(props.item.schoolSubject.average * 100) / 100
                  ).toFixed(2)
                }}
              </span>
            </td>
            <td
              v-if="
                props.item.schoolSubject && props.item.schoolSubject.teacher
              "
            >
              <span>
                {{ props.item.schoolSubject.teacher }}
              </span>
            </td>
            <td class="text-xs-right">
              <VTooltip bottom>
                <VBtn
                  flat
                  icon
                  color="accent"
                  slot="activator"
                  @click="$router.push(`/update/${props.item._id}`)"
                >
                  <VIcon>mdi-pencil</VIcon>
                </VBtn>
                <span>Editar</span>
              </VTooltip>

              <VTooltip bottom>
                <VBtn
                  flat
                  icon
                  color="error"
                  slot="activator"
                  @click="openDeleteDialog(props.item)"
                >
                  <VIcon>mdi-delete</VIcon>
                </VBtn>
                <span>Apagar</span>
              </VTooltip>
            </td>
          </template>
        </VDataTable>

        {{ studentPerSubject[0] }}
      </VFlex>
    </VLayout>

    <VDialog v-model="deleteDialog" width="400">
      <VCard>
        <VCardTitle class="headline" primary-title>
          Confirmar exclusão
        </VCardTitle>

        <VCardText class="pt-0">
          Você tem certeza que deseja excluir o estudante? Uma vez excluído, as
          alterações não podem ser desfeitas.
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn color="error" flat @click="deleteDialog = false">
            Cancelar
          </VBtn>
          <VBtn color="primary" flat @click="deleteStudent()">
            Confirmar
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VSnackbar top v-model="deleteSnackbar">
      Estudante excluído com sucesso!
      <VBtn color="primary" flat @click="deleteSnackbar = false">
        Fechar
      </VBtn>
    </VSnackbar>
  </VContainer>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      deleteDialog: false,
      deleteSnackbar: false,
      headers: [
        { text: "estudante", value: "name.firstName" },
        { text: "semestre", value: "currentSemester" },
        { text: "matéria", value: "schoolSubject.title" },
        {
          text: "média final",
          value: "schoolSubject.average"
        },
        { text: "professor", value: "schoolSubject.average" },
        { sortable: false }
      ],
      students: [],
      tempStudent: undefined
    };
  },
  async created() {
    const { data } = await axios.get(
      "https://school-mongo-api.herokuapp.com/student/failed"
    );

    this.students = data;
  },
  computed: {
    studentPerSubject: function() {
      let students = [];

      this.students.forEach(student => {
        const schoolSubjects = student.schoolSubjects;
        delete student["schoolSubjects"];

        schoolSubjects.forEach(subject => {
          student = Object.assign({}, student, { schoolSubject: subject });

          students.push(student);
        });
      });

      return students;
    }
  },
  methods: {
    async deleteStudent() {
      await axios.delete(
        `https://school-mongo-api.herokuapp.com/student/${this.tempStudent._id}`
      );
      this.deleteDialog = false;
      this.deleteSnackbar = true;
    },

    openDeleteDialog(student) {
      this.tempStudent = student;
      this.deleteDialog = true;
    }
  }
};
</script>
