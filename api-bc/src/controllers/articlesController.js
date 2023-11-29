const ArticlesModel = require("../models/Articles");

const articlesController = {

    create: async(req, res) => {
        try{
            const article = {
                title : req.body.title ,
                body : req.body.body ,
                keywords : req.body.keywords ,
                likes : req.body.likes ,
                published : req.body.published ,
                author_name : req.body.author_name,
                published_date  : req.body.published_date 
            };
            
            const response = await ArticlesModel.create(article);

            res.status(201).json({response, msg: "Artigo criado com sucesso."});
        } catch(error){
            res.status(500).json({ msg: error.message });
            console.log({error: error});             
        }
    },

    getAll: async (req,res) => {
        try{
            const articles = await ArticlesModel.find();
            res.json(articles);
        } catch(error){
            res.status(500).json({ msg: error.message });
            console.log({error: error});            
        }
    },

    get: async (req,res) => {
        try{
            const id = req.params.id;
            const article = await ArticlesModel.findById(id);

            if(!article){
                res.status(404).json({msg:"Artigo não encontrado."})
            }

            res.json(article);
        } catch(error){
            res.status(500).json({ msg: error.message });
            console.log({error: error});          
        }
    },

    delete: async (req,res) => {
        try{
            const id = req.params.id;
            const article = await ArticlesModel.findById(id);

            if(!article){
                res.status(404).json({msg:"Artigo não encontrado."})
            }

            const articleDeleted = await ArticlesModel.findByIdAndDelete(id);

            res.status(201).json({articleDeleted, msg: "Artigo deletado com sucesso."});
        } catch(error){
            res.status(500).json({ msg: error.message });
            console.log({error: error});        
        }
    },

    update: async (req,res) => {
        try{
            const id = req.params.id;

            const article = {
                title : req.body.title ,
                body : req.body.body ,
                keywords : req.body.keywords ,
                likes : req.body.likes ,
                published : req.body.published ,
                featured  : req.body.featured  ,
                author_name : req.body.author_name,
                published_date  : req.body.published_date 
            };
          
            const updatedArticles = await ArticlesModel.findByIdAndUpdate(id, article);

            if(!updatedArticles){
                res.status(404).json({msg:"Artigo não encontrado."})
            }

            res.status(201).json({updatedArticles, msg: "Artigo atualizado com sucesso."});
        } catch(error){
            res.status(500).json({ msg: error.message });
            console.log({error: error});        
        }
    },

    like:  async (req,res) => {
        try{
            const id = req.params.id;
            const article = await ArticlesModel.findById(id);
            
            if(!article){
                res.status(404).json({msg:"Artigo não encontrado."})
            }

            const newArticle = {
                likes : article.likes + 1
            };

            const updatedArticles = await ArticlesModel.findByIdAndUpdate(id, newArticle);

            if(!updatedArticles){
                res.status(404).json({msg:"Artigo não encontrado."})
            }

            res.status(201).json({updatedArticles, msg: "Artigo atualizado com sucesso."});
        } catch(error){
            res.status(500).json({ msg: error.message });
            console.log({error: error});        
        }
    }


};

module.exports = articlesController;
