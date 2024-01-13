var documenterSearchIndex = {"docs":
[{"location":"api/#The-RLEVectors-Types-and-Methods","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"","category":"section"},{"location":"api/#Index","page":"The RLEVectors Types and Methods","title":"Index","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"","category":"page"},{"location":"api/#Types","page":"The RLEVectors Types and Methods","title":"Types","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"RLEVector\nRLEDataFrame","category":"page"},{"location":"api/#RLEVectors.RLEVector","page":"The RLEVectors Types and Methods","title":"RLEVectors.RLEVector","text":"RLEVectors\n\nRLEVectors is an alternate implementation of the Rle type from Bioconductor's IRanges package by H. Pages, P. Aboyoun and M. Lawrence. RLEVectors represent a vector with repeated values as the ordered set of values and repeat extents. In the field of genomics, data of various types measured across the ~3 billion letters in the human genome can often be represented in a few thousand runs. It is useful to know the bounds of genome regions covered by these runs, the values associated with these runs, and to be able to perform various mathematical operations on these values.\n\nRLEVectors can be created from a single vector or a vector of values and a vector of run ends. In either case runs of values or zero length runs will be compressed out. RLEVectors can be expanded to a full vector with collect.\n\nAliases\n\nSeveral aliases are defined for specific types of RLEVector (or collections thereof).\n\nFloatRle              RLEVector{Float64,UInt32}\nIntegerRle            RLEVector{Int64,UInt32}\nBoolRle               RLEVector{Bool,UInt32}\nStringRle             RLEVector{String,UInt32}\nRLEVectorList{T1,T2}  Vector{ RLEVector{T1,T2} }\n\nConstructors\n\nRLEVectors can be created by specifying a vector to compress or the runvalues and run ends.\n\nx = RLEVector([1,1,2,2,3,3,4,4,4])\nx = RLEVector([4,5,6],[3,6,9])\n\nDescribing RLEVector objects\n\nRLEVectors implement the usual descriptive functions for an array as well as some that are specific to the type.\n\nlength(x) The full length of the vector, uncompressed\nsize(x) Same as length, as for any other vector\nsize(x,dim) Returns (length(x),1) for dim == 1\nstarts(x) The index of the beginning of each run\nwidths(x) The width of each run\nends(x) The index of the end of each run\nvalues(x) The data value for each run\nisempty(x) Returns boolean, as for any other vector\nnrun(x) Returns the number of runs represented in the array\neltype(x) Returns the element type of the runs\nendtype(x) Returns the element type of the run ends\n\n\n\n\n\n","category":"type"},{"location":"api/#RLEVectors.RLEDataFrame","page":"The RLEVectors Types and Methods","title":"RLEVectors.RLEDataFrame","text":"An RLEDataFrame extends DataFrame and contains a colection of like-length and like-type     RLEVectors. In a way, this creates a type like an RLE matrix. But, we deliberately     avoid the complexity of matrix operations, such as factorization. It is expected     that most operations will be column-wise. Based on RleDataFrame from Bioconductor's     genoset package (also by Peter Haverty).\n\nExamples\n\nx = RLEDataFrame( [RLEVector([1, 1, 2]), RLEVector([2, 2, 2])], [:a, :b])\ny = RLEDataFrame( [RLEVector([5])],[:a] )\nz = RLEDataFrame( a=RLEVector([5,2,2]), b=RLEVector([4,4,4])\n\n\n\n\n\n","category":"type"},{"location":"api/#Standard-Vector-API-methods","page":"The RLEVectors Types and Methods","title":"Standard Vector API methods","text":"","category":"section"},{"location":"api/#Working-with-runs","page":"The RLEVectors Types and Methods","title":"Working with runs","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"RLEVectors.jl has a collection of functions for working with runs in standard vectors. These are mostly for internal use, but are exported as they may be of general use.","category":"page"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"numruns\nree\ninverse_ree","category":"page"},{"location":"api/#RLEVectors.numruns","page":"The RLEVectors Types and Methods","title":"RLEVectors.numruns","text":"numruns(x)\n\nCount the number of runs of repeated values present in a vector.\n\n\n\n\n\nnumruns(runvalues, runends)\n\nGiven run values and run ends for a RLEVector, determine the number of runs that would     be present if it were re-compressed. RLEVectors.jl does this operation after modifying     an RLEVector, for example.\n\n\n\n\n\n","category":"function"},{"location":"api/#RLEVectors.ree","page":"The RLEVectors Types and Methods","title":"RLEVectors.ree","text":"ree(x)\n\nRun End Encode a vector\n\nLike RLE, but returns (runvalues,runends) rather than (runvalues,runlengths)\n\n\n\n\n\nree(runvalues, runends)\nree!(runvalues, runends)\nree!(x::RLEVector)\n\nTidy up an existing (mostly) Run End Encoded vector, dropping zero length runs and fixing any adjacent identical values. RLEVectors.jl does this operation after modifying an RLEVector, for example.\n\n\n\n\n\n","category":"function"},{"location":"api/#RLEVectors.inverse_ree","page":"The RLEVectors Types and Methods","title":"RLEVectors.inverse_ree","text":"inverse_ree(rle)\n\nUncompress the runs and runends of an RLEVector.\n\nExamples\n\ncollect(rle)\ninverse_ree( runvalues(rle), runends(rle) )\n\n\n\n\n\n","category":"function"},{"location":"api/#Working-with-run-boundaries-/-ranges","page":"The RLEVectors Types and Methods","title":"Working with run boundaries / ranges","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"We define some functions for comparing bins defined by our run end values.","category":"page"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"disjoin\ndisjoin_length","category":"page"},{"location":"api/#RLEVectors.disjoin","page":"The RLEVectors Types and Methods","title":"RLEVectors.disjoin","text":"disjoin(x, y)\n\nTakes runends from two RLEVectors, make one new runends breaking the pair into non-overlapping runs. Basically, this is an optimized sort!(unique([x,y]))). This is useful when comparing two RLEVector objects. The values corresponding to each disjoint run in x and y can then be compared directly.\n\nReturns\n\nAn integer vector, of a type that is the promotion of the eltypes of the runends of x and y.\n\nExamples\n\nx = [2, 4, 6]\ny = [3, 4, 5, 6]\ndisjoin(x,y)\n5-element Array{Int64}(1):\n 2\n 3\n 4\n 5\n 6\n\n\n\n\n\ndisjoin(rle_x, rle_y)\n\nExamples\n\nx = RLEVector([1,1,2,2,3,3])\ny = RLEVector([1,1,1,2,3,4])\ndisjoin(x,y)\n([2,3,4,5,6],[1,2,2,3,3],[1,1,2,3,4])\n\n\n\n\n\n","category":"function"},{"location":"api/#RLEVectors.disjoin_length","page":"The RLEVectors Types and Methods","title":"RLEVectors.disjoin_length","text":"disjoin_length(x, y)\n\nTake two runends vectors (strictly increasing integers) and find the number of unique values for the disjoin operation. This is essentially an optimized length(unique( vcat(x, y) )).\n\n\n\n\n\n","category":"function"},{"location":"api/#split-and-tapply-like-operations","page":"The RLEVectors Types and Methods","title":"split and tapply -like operations","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"An RLEVector can be used like R's factor type to apply a function over (contiguous) sections of another vector. For example, here we break a vector into 5 groups and take the average of each group. In the second example, we also scale each mean by the RLE run value corresponding to each group.","category":"page"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"tapply","category":"page"},{"location":"api/#RLEVectors.tapply","page":"The RLEVectors Types and Methods","title":"RLEVectors.tapply","text":"tapply(data_vector, rle, function)\ntapply(data_vector, factor_vector, function)\n\nMap a function to blocks of vector, like tapply in R. The first and second argument must be of the same     length. For the case of a standard vector as the second argument, this vector need not be sorted.\n\nExamples\n\nfactor = repeat( [\"a\",\"b\",\"c\",\"d\",\"e\"], inner=20 )\nrle = RLEVector( factor )\nx = collect(1:100)\ntapply( x, factor, mean )\ntapply( x, rle, mean )\n\n\n\n\n\n","category":"function"},{"location":"api/#Summaries-on-RLEVectors","page":"The RLEVectors Types and Methods","title":"Summaries on RLEVectors","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"Often we want to summarize sections of our RLEVectors. For example, if the RLEVector represent data along a genome, what are the average values associated with each of a set of regions/genes?","category":"page"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"rangeMeans","category":"page"},{"location":"api/#RLEVectors.rangeMeans","page":"The RLEVectors Types and Methods","title":"RLEVectors.rangeMeans","text":"rangeMeans(ranges::Vector{UnitRange{T}}, rle::RLEVector)\n\nSubset an RLEVector by one or more ranges, returning the average value within each range. Really, an\noptimized `[ mean(x[ r ]) for r in ranges ]`.\n\n\n\n\n\n","category":"function"},{"location":"api/#Going-back-and-forth-to-R","page":"The RLEVectors Types and Methods","title":"Going back and forth to R","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"using RCall\nx = RLEVector([1,1,2,2,1,1,3,4])\ny = RObject(x)\n@rput y\nR\"z = y + 2L\"\n@rget z","category":"page"},{"location":"api/#Utility-Functions","page":"The RLEVectors Types and Methods","title":"Utility Functions","text":"","category":"section"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"We also define some utility functions for working with repeated values and binary searching in bins/sorted integers like our run end values.","category":"page"},{"location":"api/","page":"The RLEVectors Types and Methods","title":"The RLEVectors Types and Methods","text":"rep\nsearchsortedfirst(v::AbstractVector, x::AbstractVector)\nsearchsortedfirst(v::AbstractVector, x::AbstractVector, lo::Int, hi::Int)","category":"page"},{"location":"api/#RLEVectors.rep","page":"The RLEVectors Types and Methods","title":"RLEVectors.rep","text":"rep(x::Union{Any,Vector}; each::Union{Int,Vector{Int}} = ones(Int,length(x)), times::Int = 1)\n\nConstruct a vector of repeated values, just like R's rep function. We do not have a length_out argument at this time.\n\nExamples\n\nrep([\"Go\", \"Fight\", \"Win\"], times=2)\n\n# output\n6-element Array{String,1}:\n \"Go\"\n \"Fight\"\n \"Win\"\n \"Go\"\n \"Fight\"\n \"Win\"\n\nrep([\"A\", \"B\", \"C\"], each=3)\n\n# output\n9-element Array{String,1}:\n \"A\"\n \"A\"\n \"A\"\n \"B\"\n \"B\"\n \"B\"\n \"C\"\n \"C\"\n \"C\"\n\n\n\n\n\n","category":"function"},{"location":"TODO/#TODO-list","page":"TODO list","title":"TODO list","text":"","category":"section"},{"location":"TODO/#New-types","page":"TODO list","title":"New types","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[ ] Vector{RLEVector} called RLEVectorList (RVL) with group_generics that loop over elements and match elements when given two RLEs\n[x] RLEDataFrame based on RLEVectorList\n[ ] RVL implements all RLEVector functions as map(x,rvl)\n[ ] which functions apply to the list and which map over the elements?\n[ ] RLEDF needs the same creation functions as DataFrame","category":"page"},{"location":"TODO/#.5-changes","page":"TODO list","title":"0.5 changes","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[x] Base.:(symbol) should now be Base.:symbol, requiring some changes in group_generics.jl\n[x] BaseTestNext\n[x] different show for MIME type for printing in REPL","category":"page"},{"location":"TODO/#.6-changes","page":"TODO list","title":"0.6 changes","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[ ] Figure out how to write a method for broadcast\n[ ] Get rid of the .+ type operators\n[ ] need accumulate, maybe cumsum, cumprod","category":"page"},{"location":"TODO/#Enhancements","page":"TODO list","title":"Enhancements","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[ ] Figure out how Documenter and doctests work together\n[ ] for f in  [:sum, :prod, :mean, :var, :std] @eval mapslices(f::typeof(f), A, dims) = f(A, dims) end\n[ ] Make Runs type, split from and use in RLEVector\n[x] pretty show with elipsis if length > 6, show runs and also expanded vector, use utils.rep\n[x] Add benchmark/ with R and .jl scripts comparing timings on some common things. Have one read a CSV from the other and plot.\n[ ] outer constructor for RLEVectors that takes runends or vector and then optional named args runends and runwidths\n[ ] Can I make a special zip-like loop that runs over the disjoint runs of 2+ RLEVectors and the associated values?\n[ ] vcat with splat for multiple args (vararg vcat)\n[x] deleterun! should give a ree'd RLEVector, check for newly adjacent runs, use deleteat![x,itr] if necessary\n[x] Any other function groups from DataArrays that I need?\n[x] factor out run counting stuff in ree(Vector) and disjoin, call it nrun\n[x] implement comparison operators <=, etc.\n[x] Rle to set conversion\n[ ] iterator versions of rwidth and rstart. Allocation is the root of all evil. Allocation in rwidth seems to be the bulk of 'median' at this point, for example.\n[x] ind2runcontext for UnitRange, use for setindex(x::RLEVector, value, indices::UnitRange)\n[x] Make sure this works with Julia V0.4. Likely we have some tuple trouble and the tests will be riddled with the Range expansion change ([1:4] is a 1-vector of Ranges rather than [1,2,3,4]).\n[x] function documentation section: describing\n[x] function documentation section: creating\n[x] function documentation section: range functions\n[ ] get ree and vcat out of splice\n[ ] iterator called 'ranges' that gives (first,last) indices for runs. Will require a new type with the 3 iterator methods, say RLERangesIterator.\n[x] Make sure my hash and == are what AutoHashEquals would say\n[ ] linalg operations\n[ ] make 'each' a Task?\n[ ] make disjoin Task for two RLEs?\n[ ] faster group_generic operations based on disjoin\n[ ] Some way to disjoin two RLEs such that the runends are made identical, with some repeated runvalues (necessarily). Should it be OK have an RLE be less than fully compressed? Would 'ree' then re-compress it?\n[x] test for ind2run(rle::RLEVector, i::AbstractArray)\n[x] new testing framework with nice reports\n[x] Setup Documenter.jl - based docs pushed to github by travis\n[x] add stable docs badge after next version bump\n[ ] in-place ree!(runs,lengths) as a step towards immutable RLEVector","category":"page"},{"location":"TODO/#Optimizations","page":"TODO list","title":"Optimizations","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[ ] Re-read julia/base/range.jl, some day understand the meaning of \"# to make StepRange constructor inlineable, so optimizer can see step value\"\n[x] getindex and setindex! optimizations for sorted i, especially for i::UnitRange\n[ ] Lint clean and test for that\n[ ] TypeCheck clean (and test for that?)\n[ ] some trick with start(Range) to make splice! work with scalar int or range\n[ ] revisit all the array surgery functions like splice!, factor out common elements, try to use resize and copy. Try to centralize the merging of two things, checking for shared runvalues at the ends.\n[x] try optimizing rwidth and rfirst by copying x.runends and then modifying the copy in place\n[x] much faster rwidth and rfirst\n[x] get vcat and sort out of disjoin, especially sort\n[ ] Everything seems to have a special case for length < 2 Rles. Is there some way to make those unnecessary globally?\n[x] custom O(n) disjoin\n[x] ree, bottleneck is making the return tuple. Do ree! and update an Rle?\n[x] use sort for median rather than collect, use i = fld(n,2) + 1 for odd n ...\n[x] look for places where I can use isempty instead of length. 2X speed of nrun(x) == 0 and 4X speed of length(x) == 0\n[x] findmin\n[x] findmax\n[x] findin\n[x] indexin\n[ ] can I do setindex(x::Rlevector, i, indices::Array) and such with an iterator that feeds \"ree\"?  Sort incoming indices and values of course.\n[x] add a few special cases to the \"punt else\" to work towards not punting\n[ ] setindex!(rle::RLEVector, value, i::UnitRange), can I merge this with the scalar i case using i:i?\n[x] Inherit from AbstractVector so I can get all the new free AbstractVector indexing\n[ ] Should logical indexing become indexing with an array of Ranges?\n[ ] implement Selection algorithm for median: https://en.wikipedia.org/wiki/Selection_algorithm\n[ ] while true break for ree and numruns?\n[x] rle + rle spends all its time doing ind2run \n[x] Do disjoin from 1 towards n so that we can use resize! to shrink and account for shorter length due to ties rather than using disjoin_length.\n[x] More tests for similar using 2 or 3 args\n[x] Add badges to README\n[x] Codecov.io\n[x] getindex x[i,j] on RLEDT has an extra copies the j columns unnecessarily","category":"page"},{"location":"TODO/#Bugs","page":"TODO list","title":"Bugs","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[x] fix mode, needs to do table not just which.max\n[x] fix vcat, what about merging adjacent runs?\n[x] binary_functions list not all commutative, split up, mabye set operations separately\n[x] changes to ree cause reversions in insert and splice\n[x] Fix group generics definitions to get rid of ambiguous method warnings\n[x] something is wrong with the iterator, which breaks sum and mean\n[x] something in splice and insert\n[x] ree(runvalues,runends) needs to avoid modifying input\n[x] do I need a print_matrix method to make auto-printing work? print and show work fine.\n[x] Do I need Base.linearindexing{T<:MyArray}(::Type{T}) = LinearFast() \n[x] median with an Int RLE is type unstable, div by 2 gives float otherwise Int\n[x] setindex!(rle, 801:900, 1:100) does setindex!(rle::RLEVector, value, indices::UnitRange) rather than looking for a two vector method\n[x] It seems that one cannot make a vector of RLEVectors\n[x] intersect should maintain multiplicity of 1st arg\n[x] new disjoin-based group ops does not work for .< and friends as it does scalar ops inside a loop\n[ ] findin and findmax seem to have type stability problems\n[x] rfirst(x,i) also has type stability issues\n[ ] Should RLEVector() have a runvalue of [0] or []?  It is the former at the moment.","category":"page"},{"location":"TODO/#Initial-features-for-V0.1.0","page":"TODO list","title":"Initial features for V0.1.0","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[x] Examples in toplevel README\n[x] Some bleeping unit tests already!  It's time.\n[x] Test for types\n[x] Test for collections\n[x] Test for indexing\n[x] Test for describe\n[x] Test for math\n[x] Tests for utils\n[x] Split RLEVectors.jl into multiple files by subject. It's getting unweildy.\n[x] conversion of RLEVector{T} to Vector{T}\n[x] runind or findRun or whichRun method, return index or (index,offset)\n[x] how does julia do R's table? R's S4vectors doesn't do table(rle1,rle2), but wants to\n[x] Set operations like setdiff, union, symdiff\n[x] rle method on Rle, drop zero length runs and join runs with same value\n[x] clarity on zero-length runs. OK? start and end == 1? What would value be (would I need to get myself involved with DataArrays and Nullable do do this?)\n[x] in initializer check incoming runends are sorted\n[x] initializer checks incoming runends are stricly increasing, would be nice to use issorted with a new comparator\n[x] rep utility to match R's\n[x] more vector funs: head, tail\n[x] getindex and setindex! for i::AbstractArray\n[x] deleteat!\n[x] splice!\n[x] inverse_rle method for RLEVector, use in collect etc., skip rwidth\n[x] fix setindex when on end of run, check for zero length run\n[x] resize!\n[x] constructor that takes bitarray and converts to bool array: convert(Vector{Int32},bob)\n[x] sorting including sort, issorted, reverse and sortperm","category":"page"},{"location":"TODO/#Decisions","page":"TODO list","title":"Decisions","text":"","category":"section"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[x] Decide when getindex gives an Vector or an RLEVector, be consistent\n[x] How do I set up the type hierarchy?  a.  How do I share common code as high in the tree as possible? (wait for new features of abstract types in 0.4?)  b.  Can I make it a subtype of Vector and get lots of the Vector  API for free?  Can I then use it in other places that take a  vector? Like a DataFrame column?\n[x] How do I represent the runs? length, end, start/end?\nend allows for direct binarysearch for indexing and makes size a simple lookup   Gives 5X speedup for size, 40X for indexing on RLEVector(int([1:1:1e3]),int([1:1:1e3]))   19956X speedup over R (more efficient algo here though) for     foo = Rle( seq(1,1000,5), rep.int(5,200) )     l = 1:1e3; system.time( for(i in l) { foo[100] } )       vs.     foo = IntegerRle([ int(linspace(1,1000,200)) ], [ int(linspace(1,1000,200)) ])     @time for i in 1:1e3 foo[100] end     2000X speedup for foo + 4\n[x] Is there a strictly increasing and positive int vector type I can leverage or make for the runs?      Maybe something that could be linked to the values?  OrderedSet, IntSet?      For disjoin operations, it will be useful to know the unique runends in two+ sets of runs      Would be nice to have disjoin for RLEVector and RunEnds and IRanges and GRanges types\n[x] What do I call the getters and setters? I want to use same getters for RLEs and GRanges and such.   begin, end and start are taken. first, step, and last make sense because of what they mean for ranges, but they would mean something else for a Vector   Maybe confusion between Ranges and Vector API means that I should just make my own and use rangestart, rangewidth, rangeend or rfirst, rwidth and rlast. With the latter, the 'r' could be range or run.","category":"page"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"Maybe starts, widths, ends?","category":"page"},{"location":"TODO/","page":"TODO list","title":"TODO list","text":"[x] Is it a good idea to require two arg vectors to be the same length like this: function bob{T1,T1,N}(x::Vector{T1,N},y::Vector{T2,N})  ?  Or just test the lengths and throw an ArgumentError?\n[ ] each should probably be eachrange\n[x] Is 1 an appropriate start for an empty RLEVector? Does that imply that there is a value associated? Go to zero-based, half open (#can-of-worms)?. NO.\n[x] does one export methods defined on generics from Base?\n[x] similar. What would length arg do?  length, nrun, always return an empty one?\n[x] better naming for runindex, ind2run\n[x] maybe drop ree!(x::RLEVector) for a ree that returns a tuple of cleaned up runvalues and runends? With the new 0.4 tuple hotness performance won't matter anymore (right?)\n[x] when incoming runvalues for RLEVector creation is a BitArray (like from .<) where do I unpack it? Probably best during ree, because it will probably get shorter. Use numruns(runvalues) then deal with 0-len runs separately?\n[x] What type to return for a slice of an RLEVector?\n[x] likewise, maybe ind2range(RLEVector, UnitRange) should return a UnitRange","category":"page"},{"location":"NEWS/#Version-0.0.0","page":"-","title":"Version 0.0.0","text":"","category":"section"},{"location":"NEWS/","page":"-","title":"-","text":"Super-duper dev mode. Basically, don't use this.","category":"page"},{"location":"NEWS/#Version-0.0.1","page":"-","title":"Version 0.0.1","text":"","category":"section"},{"location":"NEWS/","page":"-","title":"-","text":"Feature complete, full test coverage, all tests pass.","category":"page"},{"location":"NEWS/#Version-0.1.0","page":"-","title":"Version 0.1.0","text":"","category":"section"},{"location":"NEWS/","page":"-","title":"-","text":"All TODO items for 0.1.0 done including basic vignette / README. More optimizations and tests.","category":"page"},{"location":"#RLEVectors","page":"RLEVectors","title":"RLEVectors","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"RLEVectors is an alternate implementation of the Rle type from Bioconductor's IRanges package by H. Pages, P. Aboyoun and M. Lawrence. RLEVectors represent a vector with repeated values as the ordered set of values and repeat extents. In the field of genomics, data of various types are  measured across the ~3 billion letters in the human genome can often be represented in a few thousand runs. It is useful to know the bounds of genome regions covered by these runs, the values associated with these runs, and to be able to perform various mathematical operations as if the vector were uncompressed.","category":"page"},{"location":"#Background","page":"RLEVectors","title":"Background","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"Bioconductor has some widely used and extremely convenient types for working with collections of ranges, which sometimes are with associated data.IRanges represents a collection of arbitrary start, end pairs in [1,Inf). GRanges uses IRanges to represent locations on a genome and adds annotation of the chromosome and strand for each range. Children of GRanges add other annotations the the ranges. Rle represents the range [1:n] broken into arbitrary chunks or segments.","category":"page"},{"location":"#Implementation-Details","page":"RLEVectors","title":"Implementation Details","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"RLEVectors differs from R's Rle in that we store the run values and run ends rather than the run values and run lengths. The run ends are convenient in that they allow for indexing into the vector by binary search (scalar indexing is O(log(n)) rather than O(n) ). Additionally, length is O(1) rather than O(n) (it's the last run end rather than the sum of the run lengths). On the other hand, various operations do require the run lengths, which have to be calculated. See the benchmark directory and reports to see how this plays out.","category":"page"},{"location":"#Creation","page":"RLEVectors","title":"Creation","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"RLEVectors can be created from a single vector or a vector of values and a vector of run ends. In either case runs of values or zero length runs will be compressed out. RLEVectors can be expanded to a full vector like a Range with collect.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"using RLEVectors\nx = RLEVector([1,1,2,2,3,3,4,4,4])\ncollect(x)\ny = RLEVector([4,5,6],[3,6,9])\ncollect(y)","category":"page"},{"location":"#Describing","page":"RLEVectors","title":"Describing","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"RLEVectors implement the usual descriptive functions for an array as well as some that are specific to the type.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"length(x) The full length of the vector, uncompressed\nsize(x) Same as length, as for any other vector\nsize(x,dim) Returns (length(x),1) for dim == 1\nstarts(x) The index of the beginning of each run\nwidths(x) The width of each run\nends(x) The index of the end of each run\nvalues(x) The data value for each run\nisempty(x) Returns boolean, as for any other vector\nnrun(x) Returns the number of runs represented in the array\neltype(x) Returns the element type of the runs\nendtype(x) Returns the element type of the run ends","category":"page"},{"location":"#Standard-vector-operations","page":"RLEVectors","title":"Standard vector operations","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"RLEVectors can be treated as standard Vectors for arithmetic and collection operations. In many cases these operations are more efficient than operations on a standard vector.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"x = RLEVector([4,5,6],[3,6,9])\nx[2]\nx[7:9] = 10\npush!(x,6)\nx + 2x\nunique(x)\nfindin(x,5)\nx > 4.2\nsort(x)\nmedian(x)","category":"page"},{"location":"#split-and-tapply-like-operations","page":"RLEVectors","title":"split and tapply -like operations","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"An RLEVector can be used like R's factor type to apply a function over (contiguous) sections of another vector. For example, here we break a vector into 5 groups and take the average of each group. In the second example, we also scale each mean by the RLE run value corresponding to each group.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"factor = repeat( [\"a\",\"b\",\"c\",\"d\",\"e\"], inner=20 )\nrle = RLEVector( factor )\nx = collect(1:100)\ngroup_means = Float64[ mean(x[r]) for (v,r) in each(rle) ]","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"This is much like the tapply operation in R. A convenience wrapper with this name is provided. The second, factor, argument can be an RLEVector or a Vector to be converted to an RLEVector. This vector need not be sorted.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"tapply( x, factor, mean )\ntapply( x, rle, mean )","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"In addition to the Range for each RLE run, the each iterator provides the corresponding run value. These values can be used in calculations on each vector block.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"x = collect(1:100)\nrle2 = RLEVector( repeat( [1,2,3,4,5], inner=20 ) )\nscaled_group_means = Float64[ v * mean(x[r]) for (v,r) in each(rle2) ]","category":"page"},{"location":"#Relative-speed","page":"RLEVectors","title":"Relative speed","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"RLEVectors has been extensively profiled and somewhat optimized. Please see the benchmarking section for the evolution over time and comparisons to like operations in R.","category":"page"},{"location":"#Benchmarks","page":"RLEVectors","title":"Benchmarks","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"** Please note that these benchmarks include data structure / algorithmic differences as well as language differences ** For example, indexing is O( log(n) ) in RLEVectors.jl and O(n) in the original R implementation. Similarly, last is a simple lookup in RLEVectors.jl where width is a lookup in the R version. Other functions listed here of the same computational order, but not necessarily direct translations. RLEVectors.jl is written in my interpretation of idiomatic julia.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"(Image: Benchmarking results)","category":"page"},{"location":"#Optimization-progress","page":"RLEVectors","title":"Optimization progress","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"(Image: Optimization progress)","category":"page"},{"location":"#Memory-considerations","page":"RLEVectors","title":"Memory considerations","text":"","category":"section"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"Data compression is a secondary benefit of RLEVectors, but it can be convenient. Generally run ends are stored as Int64. However, if further memory savings are desired, consider smaller and unsigned types. UInt32 is sufficient to hold the length of the human genome and UInt16 can hold the length of the longest human chromosome.","category":"page"},{"location":"","page":"RLEVectors","title":"RLEVectors","text":"RLEVector([5.1,2.9,100.7], UInt16[4,8,22])","category":"page"}]
}