<template>
  <VContainer grid-list-md box>
    <VLayout wrap>
      <VFlex xs12 text-xs-center display-2 font-weight-light>Alunos</VFlex>
      <VFlex xs12>
        <VDataTable
          :headers="headers"
          :items="students"
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
              <span v-if="props.item.email">
                {{ props.item.email }}
              </span>
            </td>
            <td>
              <span v-if="props.item.currentSemester">
                {{ props.item.currentSemester }}
              </span>
            </td>
            <td
              v-if="
                props.item.demographics && props.item.demographics.birthDate
              "
            >
              <span>
                {{
                  new Date(
                    props.item.demographics.birthDate
                  ).toLocaleDateString()
                }}
              </span>
            </td>
            <td>
              <span>
                {{ props.item.demographics.projectedGraduationYear }}
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
        { text: "nome completo", value: "name.firstName" },
        { text: "e-mail", value: "email" },
        { text: "semestre atual", value: "currentSemester" },
        { text: "data de nascimento", value: "demographics.birthDate" },
        {
          text: "conclusão do curso",
          value: "demographics.projectedGraduationYear"
        },
        { sortable: false }
      ],
      students: [],
      tempStudent: undefined
    };
  },
  async created() {
    const { data } = await axios.get(
      "https://school-mongo-api.herokuapp.com/student"
    );

    this.students = data;
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
